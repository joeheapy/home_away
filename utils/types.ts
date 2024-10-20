// The action function is used to handle the form data
export type actionFunction = (
    prevState: any,
    formData: FormData
    // The return type is a promise that resolves to an object 
    // with a message property of type string 
  ) => Promise<{ message: string }>;