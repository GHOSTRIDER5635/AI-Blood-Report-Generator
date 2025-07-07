import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface BloodTestData {
  // Patient Information
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  testDate: string;
  
  // Blood Parameters
  hemoglobin: number;
  wbcCount: number;
  rbcCount: number;
  platelets: number;
  hematocrit: number;
  mcv: number;
  mch: number;
  mchc: number;
}

interface BloodTestFormProps {
  onSubmit: (data: BloodTestData) => void;
  loading?: boolean;
}

const BloodTestForm = ({ onSubmit, loading = false }: BloodTestFormProps) => {
  const [formData, setFormData] = useState<BloodTestData>({
    // Patient Information
    name: '',
    age: 0,
    gender: 'male',
    testDate: new Date().toISOString().split('T')[0],
    
    // Blood Parameters
    hemoglobin: 0,
    wbcCount: 0,
    rbcCount: 0,
    platelets: 0,
    hematocrit: 0,
    mcv: 0,
    mch: 0,
    mchc: 0,
  });

  const handleInputChange = (field: keyof BloodTestData, value: string) => {
    if (field === 'name' || field === 'gender' || field === 'testDate') {
      setFormData(prev => ({ ...prev, [field]: value }));
    } else {
      const numValue = parseFloat(value) || 0;
      setFormData(prev => ({ ...prev, [field]: numValue }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const testParameters = [
    { key: 'hemoglobin' as keyof BloodTestData, label: 'Hemoglobin', unit: 'g/dL', normalRange: '12.0-15.5' },
    { key: 'wbcCount' as keyof BloodTestData, label: 'WBC Count', unit: '/µL', normalRange: '4,000-11,000' },
    { key: 'rbcCount' as keyof BloodTestData, label: 'RBC Count', unit: 'million/µL', normalRange: '4.5-5.5' },
    { key: 'platelets' as keyof BloodTestData, label: 'Platelets', unit: '/µL', normalRange: '150,000-450,000' },
    { key: 'hematocrit' as keyof BloodTestData, label: 'Hematocrit', unit: '%', normalRange: '36-46' },
    { key: 'mcv' as keyof BloodTestData, label: 'MCV', unit: 'fL', normalRange: '80-100' },
    { key: 'mch' as keyof BloodTestData, label: 'MCH', unit: 'pg', normalRange: '27-32' },
    { key: 'mchc' as keyof BloodTestData, label: 'MCHC', unit: 'g/dL', normalRange: '32-36' },
  ];

  return (
    <Card className="shadow-card border-0">
      <CardHeader className="bg-gradient-medical text-white rounded-t-lg">
        <CardTitle className="text-2xl font-semibold">Blood Test Parameters</CardTitle>
        <CardDescription className="text-white/90">
          Enter the blood test values to generate an AI-powered analysis report
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Patient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Patient Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter patient name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age || ''}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="Enter age"
                  min="0"
                  max="120"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm font-medium">
                  Gender
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="testDate" className="text-sm font-medium">
                  Test Date
                </Label>
                <Input
                  id="testDate"
                  type="date"
                  value={formData.testDate}
                  onChange={(e) => handleInputChange('testDate', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Blood Parameters Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Blood Test Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testParameters.map(({ key, label, unit, normalRange }) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key} className="text-sm font-medium flex items-center justify-between">
                  {label}
                  <Badge variant="outline" className="text-xs font-normal">
                    Normal: {normalRange} {unit}
                  </Badge>
                </Label>
                <div className="relative">
                  <Input
                    id={key}
                    type="number"
                    step="0.1"
                    value={formData[key] || ''}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className="pr-12"
                    required
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                    {unit}
                  </span>
                </div>
              </div>
            ))}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-medical hover:opacity-90 transition-opacity font-semibold py-3"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Generate AI Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BloodTestForm;