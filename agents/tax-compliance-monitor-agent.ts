import OpenAI from 'openai';

export interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  category: 'filing' | 'payment' | 'deduction' | 'reporting';
  deadline?: string;
  penalty?: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface ComplianceStatus {
  overallScore: number;
  violations: string[];
  warnings: string[];
  deadlines: Array<{
    date: string;
    description: string;
    type: 'filing' | 'payment' | 'reporting';
    status: 'pending' | 'overdue' | 'completed';
  }>;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export class TaxComplianceMonitorAgent {
  private openai: OpenAI;
  public name: string;
  public description: string;
  public version: string;
  public status: 'idle' | 'monitoring' | 'error';
  private complianceRules: ComplianceRule[];

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
    this.name = "Tax Compliance Monitor Agent";
    this.description = "Real-time tax compliance monitoring and deadline tracking";
    this.version = "1.0.0";
    this.status = 'idle';
    this.complianceRules = this.loadDefaultRules();
  }

  async monitorCompliance(taxData: any, currentDate: Date = new Date()): Promise<ComplianceStatus> {
    this.status = 'monitoring';
    
    try {
      const analysis = await this.analyzeCompliance(taxData, currentDate);
      this.status = 'idle';
      return analysis;
    } catch (error) {
      this.status = 'error';
      throw new Error(`Compliance monitoring failed: ${error}`);
    }
  }

  private async analyzeCompliance(taxData: any, currentDate: Date): Promise<ComplianceStatus> {
    const prompt = `
      Analyze tax compliance based on the following data:
      
      Tax Data: ${JSON.stringify(taxData)}
      Current Date: ${currentDate.toISOString()}
      
      Available Rules: ${JSON.stringify(this.complianceRules)}
      
      Please provide:
      1. Overall compliance score (0-100)
      2. List of violations
      3. List of warnings
      4. Upcoming deadlines
      5. Risk level assessment
      6. Recommendations for improvement
      
      Respond in JSON format.
    `;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) throw new Error('No response from AI');

    try {
      return JSON.parse(result) as ComplianceStatus;
    } catch {
      // Fallback response
      return {
        overallScore: 85,
        violations: ['Unable to analyze compliance'],
        warnings: ['Manual review recommended'],
        deadlines: [],
        riskLevel: 'medium',
        recommendations: ['Contact tax professional for review'],
      };
    }
  }

  private loadDefaultRules(): ComplianceRule[] {
    return [
      {
        id: 'filing_deadline',
        name: 'Individual Tax Return Filing',
        description: 'Individual tax returns must be filed by April 15th',
        category: 'filing',
        deadline: '2024-04-15',
        penalty: '$435 minimum penalty for late filing',
        riskLevel: 'high'
      },
      {
        id: 'estimated_payments',
        name: 'Quarterly Estimated Tax Payments',
        description: 'Estimated tax payments due quarterly',
        category: 'payment',
        deadline: '2024-06-15',
        penalty: 'Interest on underpayment',
        riskLevel: 'medium'
      },
      {
        id: 'business_expenses',
        name: 'Business Expense Documentation',
        description: 'All business expenses must be properly documented',
        category: 'deduction',
        riskLevel: 'medium'
      }
    ];
  }

  async getAgentInfo() {
    return {
      name: this.name,
      description: this.description,
      version: this.version,
      status: this.status,
      capabilities: [
        'Real-time compliance monitoring',
        'Deadline tracking',
        'Risk assessment',
        'Violation detection',
        'Recommendation generation'
      ],
      bmadPhase: 'MEASURE'
    };
  }
}
