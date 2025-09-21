// implementation detail
const conversations = new Map<string, string>();

// export public interface

export const conversationRepository = {
  setLastResponseId(conversationId: string, responseId: string) {
    return conversations.set(conversationId, responseId);
  },
  getLastResponseId(conversationId: string) {
    return conversations.get(conversationId);
  },
};
