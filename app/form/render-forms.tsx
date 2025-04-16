// 'use clean';

import { FC } from 'react';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { QuestionForms } from '~/model/types/questions';

type Props = {
  questions: QuestionForms['questions'];
};

export const RenderForms: FC<Props> = ({ questions }) => {
  console.log(questions);

  return (
    <form>
      {questions.map((question) => {
        if (question.type === 'checkbox') {
          return (
            <div key={question.id} className="mb-4">
              <Label>{question.label}</Label>

              {question.options?.map((option) => (
                <div key={option} id={question.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={question.id}
                    name={question.id}
                    value={option}
                    className="mr-2"
                  />

                  <label htmlFor={question.id}>{option}</label>
                </div>
              ))}
            </div>
          );
        }

        if (question.type === 'radio') {
          return (
            <div key={question.id} className="mb-4">
              <p className="block text-sm font-medium text-gray-700">{question.label}</p>

              <RadioGroup>
                {question.options?.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem id={option} value={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          );
        }

        return (
          <div key={question.id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{question.label}</label>

            <Input
              type={question.type}
              name={question.id}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );
      })}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};
