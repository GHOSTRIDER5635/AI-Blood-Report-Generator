import { useState } from "react";
import BloodTestForm, { BloodTestData } from "@/components/BloodTestForm";
import BloodReportAnalysis from "@/components/BloodReportAnalysis";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/medical-hero.jpg";

const Index = () => {
  const [analysisData, setAnalysisData] = useState<BloodTestData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFormSubmit = async (data: BloodTestData) => {
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAnalysisData(data);
    setIsAnalyzing(false);
  };

  const handleNewReport = () => {
    setAnalysisData(null);
  };

  return (
    <div className="min-h-screen bg-red-light">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-medical overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-center text-white w-full">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              AI Blood Report Generator
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Advanced artificial intelligence analysis for comprehensive blood test interpretation
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {!analysisData ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-foreground mb-4">
                Enter Your Blood Test Results
              </h2>
              <p className="text-muted-foreground text-lg">
                Our AI will analyze your blood parameters and provide detailed insights
              </p>
            </div>
            
            <BloodTestForm onSubmit={handleFormSubmit} loading={isAnalyzing} />
            
            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 rounded-lg bg-gradient-subtle border">
                <div className="w-12 h-12 bg-medical-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms analyze your blood parameters with medical precision
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-gradient-subtle border">
                <div className="w-12 h-12 bg-medical-success rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold">📊</span>
                </div>
                <h3 className="font-semibold mb-2">Instant Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get comprehensive analysis and recommendations in seconds
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-gradient-subtle border">
                <div className="w-12 h-12 bg-medical-info rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold">🔒</span>
                </div>
                <h3 className="font-semibold mb-2">Secure & Private</h3>
                <p className="text-sm text-muted-foreground">
                  Your health data is processed securely and never stored
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-semibold text-foreground">
                  Your Blood Test Analysis
                </h2>
                <p className="text-muted-foreground mt-2">
                  AI-generated comprehensive report and recommendations
                </p>
              </div>
              <Button 
                onClick={handleNewReport}
                variant="outline"
                className="font-semibold"
              >
                New Report
              </Button>
            </div>
            
            <BloodReportAnalysis data={analysisData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;