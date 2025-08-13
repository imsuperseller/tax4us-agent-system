import OpenAI from 'openai';

export interface DecisionOption {
  id: string;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
  estimatedImpact: {
    savings: number;
    timeInvestment: number;
    complexity: number;
  };
  recommendedAction: string;
}

export interface DecisionAnalysis {
  problem: string;
  context: string;
  options: DecisionOption[];
  recommendation: {
    primary: DecisionOption;
    alternatives: DecisionOption[];
    reasoning: string;
  };
  nextSteps: Array<{
    action: string;
    timeline: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    responsible: string;
  }>;
  riskMitigation: string[];
  successMetrics: string[];
}

export class TaxDecisionSupportAgent {
  private openai: OpenAI;
  public name: string;
  public description: string;
  public version: string;
  public status: 'idle' | 'analyzing' | 'error';

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
    this.name = "Tax Decision Support Agent";
    this.description = "AI-powered decision support for tax strategy and planning";
    this.version = "1.0.0";
    this.status = 'idle';
  }

  async analyzeDecision(
    problem: string,
    context: any,
    availableData: any
  ): Promise<DecisionAnalysis> {
    this.status = 'analyzing';
    
    try {
      const analysis = await this.generateDecisionAnalysis(problem, context, availableData);
      this.status = 'idle';
      return analysis;
    } catch (error) {
      this.status = 'error';
      throw new Error(`Decision analysis failed: ${error}`);
    }
  }

  private async generateDecisionAnalysis(
    problem: string,
    context: any,
    availableData: any
  ): Promise<DecisionAnalysis> {
    const prompt = `
      Analyze the following tax decision problem and provide structured decision support:
      
      Problem: ${problem}
      Context: ${JSON.stringify(context)}
      Available Data: ${JSON.stringify(availableData)}
      
      Please provide:
      1. Clear problem statement
      2. Context analysis
      3. 3-5 decision options with pros/cons
      4. Primary recommendation with reasoning
      5. Alternative options
      6. Specific next steps with timeline
      7. Risk mitigation strategies
      8. Success metrics
      
      Respond in JSON format with the following structure:
      {
        "problem": "string",
        "context": "string", 
        "options": [{"id": "string", "title": "string", "description": "string", "pros": ["string"], "cons": ["string"], "riskLevel": "low|medium|high", "confidence": number, "estimatedImpact": {"savings": number, "timeInvestment": number, "complexity": number}, "recommendedAction": "string"}],
        "recommendation": {"primary": {...}, "alternatives": [...], "reasoning": "string"},
        "nextSteps": [{"action": "string", "timeline": "string", "priority": "critical|high|medium|low", "responsible": "string"}],
        "riskMitigation": ["string"],
        "successMetrics": ["string"]
      }
    `;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) throw new Error('No response from AI');

    try {
      return JSON.parse(result) as DecisionAnalysis;
    } catch {
      // Fallback response
      return {
        problem: problem,
        context: 'Unable to analyze context',
        options: [
          {
            id: 'consult_professional',
            title: 'Consult Tax Professional',
            description: 'Seek professional tax advice for complex decisions',
            pros: ['Expert guidance', 'Risk mitigation', 'Compliance assurance'],
            cons: ['Cost', 'Time investment', 'Dependency'],
            riskLevel: 'low',
            confidence: 90,
            estimatedImpact: {
              savings: 0,
              timeInvestment: 2,
              complexity: 1
            },
            recommendedAction: 'Schedule consultation with qualified tax professional'
          }
        ],
        recommendation: {
          primary: {
            id: 'consult_professional',
            title: 'Consult Tax Professional',
            description: 'Seek professional tax advice for complex decisions',
            pros: ['Expert guidance', 'Risk mitigation', 'Compliance assurance'],
            cons: ['Cost', 'Time investment', 'Dependency'],
            riskLevel: 'low',
            confidence: 90,
            estimatedImpact: {
              savings: 0,
              timeInvestment: 2,
              complexity: 1
            },
            recommendedAction: 'Schedule consultation with qualified tax professional'
          },
          alternatives: [],
          reasoning: 'Professional consultation recommended for complex tax decisions'
        },
        nextSteps: [
          {
            action: 'Contact tax professional',
            timeline: 'Within 7 days',
            priority: 'high',
            responsible: 'Taxpayer'
          }
        ],
        riskMitigation: ['Professional review', 'Documentation', 'Compliance checking'],
        successMetrics: ['Decision clarity', 'Risk reduction', 'Compliance assurance']
      };
    }
  }

  async getAgentInfo() {
    return {
      name: this.name,
      description: this.description,
      version: this.version,
      status: this.status,
      capabilities: [
        'Decision analysis',
        'Option evaluation',
        'Risk assessment',
        'Recommendation generation',
        'Action planning'
      ],
      bmadPhase: 'DECIDE'
    };
  }
}
