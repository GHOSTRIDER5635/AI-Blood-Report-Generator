import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BloodTestData } from "./BloodTestForm";

interface AnalysisResult {
  parameter: string;
  value: number;
  unit: string;
  status: 'normal' | 'low' | 'high';
  normalRange: string;
  interpretation: string;
}

interface BloodReportAnalysisProps {
  data: BloodTestData;
}

const BloodReportAnalysis = ({ data }: BloodReportAnalysisProps) => {
  const analyzeBloodTest = (data: BloodTestData): AnalysisResult[] => {
    const results: AnalysisResult[] = [
      {
        parameter: 'Hemoglobin',
        value: data.hemoglobin,
        unit: 'g/dL',
        status: data.hemoglobin < 12 ? 'low' : data.hemoglobin > 15.5 ? 'high' : 'normal',
        normalRange: '12.0-15.5',
        interpretation: data.hemoglobin < 12 ? 'May indicate anemia' : data.hemoglobin > 15.5 ? 'May indicate dehydration or polycythemia' : 'Within normal range'
      },
      {
        parameter: 'WBC Count',
        value: data.wbcCount,
        unit: '/µL',
        status: data.wbcCount < 4000 ? 'low' : data.wbcCount > 11000 ? 'high' : 'normal',
        normalRange: '4,000-11,000',
        interpretation: data.wbcCount < 4000 ? 'May indicate immune system issues' : data.wbcCount > 11000 ? 'May indicate infection or inflammation' : 'Within normal range'
      },
      {
        parameter: 'RBC Count',
        value: data.rbcCount,
        unit: 'million/µL',
        status: data.rbcCount < 4.5 ? 'low' : data.rbcCount > 5.5 ? 'high' : 'normal',
        normalRange: '4.5-5.5',
        interpretation: data.rbcCount < 4.5 ? 'May indicate anemia' : data.rbcCount > 5.5 ? 'May indicate dehydration' : 'Within normal range'
      },
      {
        parameter: 'Platelets',
        value: data.platelets,
        unit: '/µL',
        status: data.platelets < 150000 ? 'low' : data.platelets > 450000 ? 'high' : 'normal',
        normalRange: '150,000-450,000',
        interpretation: data.platelets < 150000 ? 'May affect blood clotting' : data.platelets > 450000 ? 'May increase clotting risk' : 'Within normal range'
      },
      {
        parameter: 'Hematocrit',
        value: data.hematocrit,
        unit: '%',
        status: data.hematocrit < 36 ? 'low' : data.hematocrit > 46 ? 'high' : 'normal',
        normalRange: '36-46',
        interpretation: data.hematocrit < 36 ? 'May indicate anemia' : data.hematocrit > 46 ? 'May indicate dehydration' : 'Within normal range'
      },
      {
        parameter: 'MCV',
        value: data.mcv,
        unit: 'fL',
        status: data.mcv < 80 ? 'low' : data.mcv > 100 ? 'high' : 'normal',
        normalRange: '80-100',
        interpretation: data.mcv < 80 ? 'May indicate iron deficiency' : data.mcv > 100 ? 'May indicate B12/folate deficiency' : 'Within normal range'
      },
      {
        parameter: 'MCH',
        value: data.mch,
        unit: 'pg',
        status: data.mch < 27 ? 'low' : data.mch > 32 ? 'high' : 'normal',
        normalRange: '27-32',
        interpretation: data.mch < 27 ? 'May indicate iron deficiency' : data.mch > 32 ? 'May indicate B12/folate deficiency' : 'Within normal range'
      },
      {
        parameter: 'MCHC',
        value: data.mchc,
        unit: 'g/dL',
        status: data.mchc < 32 ? 'low' : data.mchc > 36 ? 'high' : 'normal',
        normalRange: '32-36',
        interpretation: data.mchc < 32 ? 'May indicate iron deficiency' : data.mchc > 36 ? 'May indicate spherocytosis' : 'Within normal range'
      }
    ];

    return results;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-medical-success text-white';
      case 'low': return 'bg-medical-warning text-white';
      case 'high': return 'bg-medical-danger text-white';
      default: return 'bg-muted';
    }
  };

  const results = analyzeBloodTest(data);
  const abnormalResults = results.filter(r => r.status !== 'normal');
  
  const generateRecommendations = () => {
    const recommendations = [];
    
    if (abnormalResults.some(r => r.parameter === 'Hemoglobin' && r.status === 'low')) {
      recommendations.push("Consider iron-rich foods and consult about iron supplements");
    }
    if (abnormalResults.some(r => r.parameter === 'WBC Count' && r.status === 'high')) {
      recommendations.push("Monitor for signs of infection and consider follow-up testing");
    }
    if (abnormalResults.some(r => r.parameter === 'Platelets' && r.status === 'low')) {
      recommendations.push("Avoid activities with high bleeding risk");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("Maintain current health practices - results look good!");
    }
    
    return recommendations;
  };

  return (
    <div className="space-y-6">
      {/* Patient Information Card */}
      <Card className="shadow-card border-0">
        <CardHeader className="bg-gradient-medical text-white rounded-t-lg">
          <CardTitle className="text-xl font-semibold">Patient Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Patient Name</p>
              <p className="font-semibold text-lg">{data.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-semibold text-lg">{data.age} years</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gender</p>
              <p className="font-semibold text-lg capitalize">{data.gender}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Test Date</p>
              <p className="font-semibold text-lg">{new Date(data.testDate).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-medical-primary">AI Analysis Report</CardTitle>
          <CardDescription>
            Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {results.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-gradient-subtle">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{result.parameter}</span>
                    <Badge className={getStatusColor(result.status)}>
                      {result.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{result.interpretation}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-lg">{result.value} {result.unit}</div>
                  <div className="text-xs text-muted-foreground">Normal: {result.normalRange}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {abnormalResults.length > 0 && (
        <Alert className="border-medical-warning bg-medical-warning/10">
          <AlertDescription>
            <strong>Attention Required:</strong> {abnormalResults.length} parameter(s) outside normal range. 
            Please consult with a healthcare professional for proper interpretation and guidance.
          </AlertDescription>
        </Alert>
      )}

      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-medical-info">AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {generateRecommendations().map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-2 h-2 bg-medical-info rounded-full mt-2 flex-shrink-0"></span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
          
          <Alert className="mt-4 border-medical-info bg-medical-info/10">
            <AlertDescription className="text-sm">
              <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and should not replace professional medical advice. 
              Always consult with qualified healthcare providers for proper diagnosis and treatment.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default BloodReportAnalysis;