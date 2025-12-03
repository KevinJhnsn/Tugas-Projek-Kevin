'use server';

/**
 * @fileOverview AI-driven financial insights flow.
 *
 * This file defines a Genkit flow that analyzes user spending habits and income to provide personalized financial advice and savings tips.
 *
 * @example
 * // Example usage:
 * const insights = await getFinancialInsights({ income: 5000, expenses: [{ category: 'Food', amount: 500 }, { category: 'Entertainment', amount: 200 }] });
 *
 * @interface FinancialInsightsInput - The input schema for the getFinancialInsights function.
 * @interface FinancialInsightsOutput - The output schema for the getFinancialInsights function.
 * @function getFinancialInsights - A function that takes FinancialInsightsInput and returns a Promise of FinancialInsightsOutput.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for financial insights
const FinancialInsightsInputSchema = z.object({
  income: z.number().describe('Monthly income'),
  expenses: z.array(
    z.object({
      category: z.string().describe('Expense category'),
      amount: z.number().describe('Expense amount'),
    })
  ).describe('List of expenses'),
  savingsGoal: z.number().optional().describe('The user savings goal'),
  currentSavings: z.number().optional().describe('The user current savings'),
});

export type FinancialInsightsInput = z.infer<typeof FinancialInsightsInputSchema>;

// Output schema for financial insights
const FinancialInsightsOutputSchema = z.object({
  insights: z.string().describe('Personalized financial advice and insights'),
  savingsTips: z.array(z.string()).describe('Applicable saving tips for the user'),
  goalPrediction: z.string().optional().describe('Predicted date to reach savings goal if provided'),
});

export type FinancialInsightsOutput = z.infer<typeof FinancialInsightsOutputSchema>;

// Define a tool to get applicable savings tips
const getSavingsTips = ai.defineTool(
  {
    name: 'getSavingsTips',
    description: 'Retrieves a list of applicable savings tips based on the user financial situation.',
    inputSchema: z.object({
      expenses: z.array(
        z.object({
          category: z.string().describe('Expense category'),
          amount: z.number().describe('Expense amount'),
        })
      ).describe('List of expenses'),
    }),
    outputSchema: z.array(z.string()).describe('List of applicable savings tips'),
  },
  async (input) => {
    const {
      expenses,
    } = input;

    const allSavingTips = [
      'Reduce eating out by cooking at home more often.',
      'Find cheaper entertainment options.',
      'Cut down on non-essential subscriptions.',
      'Use discount codes and coupons when shopping.',
      'Compare prices before making a purchase.',
      'Walk or bike instead of driving.',
      'Conserve electricity by turning off lights and unplugging electronics when not in use.',
    ];

    const applicableTips: string[] = [];

    if (expenses.some(exp => exp.category === 'Food' && exp.amount > 300)) {
      applicableTips.push(allSavingTips[0]);
    }

    if (expenses.some(exp => exp.category === 'Entertainment' && exp.amount > 100)) {
      applicableTips.push(allSavingTips[1]);
    }

    if (expenses.some(exp => exp.category === 'Subscriptions' && exp.amount > 50)) {
      applicableTips.push(allSavingTips[2]);
    }

    applicableTips.push(allSavingTips[3], allSavingTips[4], allSavingTips[5], allSavingTips[6]);

    return applicableTips;
  }
);

const financialInsightsPrompt = ai.definePrompt({
  name: 'financialInsightsPrompt',
  tools: [getSavingsTips],
  input: {schema: FinancialInsightsInputSchema},
  output: {schema: FinancialInsightsOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the user's income and expenses, providing personalized advice and suggesting ways to save more effectively.

The user's name is Kevin, unless specified otherwise. 

Income: {{{income}}}
Expenses:
{{#each expenses}}
  - Category: {{{category}}}, Amount: {{{amount}}}
{{/each}}

{{#if savingsGoal}}
  Savings Goal: {{{savingsGoal}}}
  Current Savings: {{{currentSavings}}}
{{/if}}

Based on this information, provide insights into their spending habits and suggest concrete ways to save money. Also use available tools to provide a tailored list of savings tips that apply to the user's circumstances.

{{#if savingsGoal}}
  Also, predict when Kevin will reach his savings goal, assuming current spending habits continue. If savings goal and current savings is not specified, don't make a prediction.
{{/if}}
`,
});

const financialInsightsFlow = ai.defineFlow(
  {
    name: 'financialInsightsFlow',
    inputSchema: FinancialInsightsInputSchema,
    outputSchema: FinancialInsightsOutputSchema,
  },
  async input => {
    const {output} = await financialInsightsPrompt(input);
    return output!;
  }
);

export async function getFinancialInsights(input: FinancialInsightsInput): Promise<FinancialInsightsOutput> {
  return financialInsightsFlow(input);
}
