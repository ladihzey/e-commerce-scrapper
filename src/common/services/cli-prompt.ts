import prompts from 'prompts';
import { notEmpty } from '@/common/utils/notEmpty';

class CliPrompt {
    async askQuestion(question: string): Promise<string> {
        const { target } = await prompts({
            type: 'text',
            name: 'target',
            message: question,
            validate: response => notEmpty(response) && response.trim() !== '',
        });

        return target;
    }
}

export const cliPrompt = new CliPrompt();
