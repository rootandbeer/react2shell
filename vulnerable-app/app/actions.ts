'use server'

// This server action is vulnerable to React2Shell (CVE-2025-55182 / CVE-2025-66478)
// The vulnerability occurs when React Server Components deserialize untrusted input
// without proper validation, allowing remote code execution.

export async function submitAction(formData: FormData) {
  try {
    // Vulnerable: Directly processing form data without validation
    // In vulnerable React 19.x versions, this can lead to unsafe deserialization
    const data1 = formData.get('1')
    const data0 = formData.get('0')
    
    // The vulnerability is triggered when Next.js processes the Next-Action header
    // and deserializes the form data in a way that allows code execution
    
    return {
      success: true,
      received: {
        field1: data1,
        field0: data0
      },
      message: 'Data processed (vulnerable endpoint)'
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

