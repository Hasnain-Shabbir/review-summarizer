- To keep the memory, we can use a variable to store the id of last chat.

- We can use a map to store the chat id for different chats to keep history.

- We used the custom types on the api response because we don't want to share the methods of the LLM with other modules, if we decide to change the LLM, we have to only change one file.