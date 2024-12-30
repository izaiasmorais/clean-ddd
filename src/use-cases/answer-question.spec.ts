import { describe, it, expect, vi } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRepository } from "../repositories/answer-repository";

const mockAnswerQuestionRepository: AnswersRepository = {
	create: vi.fn(),
};

describe("AnswerQuestionUseCase", () => {
	it("should create an answer", async () => {
		const answerQuestionUseCase = new AnswerQuestionUseCase(
			mockAnswerQuestionRepository
		);

		const answer = await answerQuestionUseCase.execute({
			content: "This is an answer",
			instructorId: "instructor-123",
			questionId: "question-456",
		});

		expect(answer.content).toBe("This is an answer");
	});
});
