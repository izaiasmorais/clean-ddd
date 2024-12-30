import { UniqueEntityID } from "../core/entities/unique-entity-id";
import { Answer } from "../domain/entities/answer";
import type { AnswersRepository } from "../repositories/answer-repository";

interface AnswerQuestionUseCaseRequest {
	content: string;
	instructorId: string;
	questionId: string;
}

export class AnswerQuestionUseCase {
	constructor(private questionRepository: AnswersRepository) {}

	async execute(props: AnswerQuestionUseCaseRequest) {
		const answer = Answer.create({
			content: props.content,
			authorId: new UniqueEntityID(props.instructorId),
			questionId: new UniqueEntityID(props.questionId),
		});

		await this.questionRepository.create(answer);

		return answer;
	}
}
