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
    // and deserializes the form data. The deserialization happens BEFORE this function
    // is called, so code execution occurs during the React Flight protocol deserialization.
    // The $1:a:a pattern triggers prototype pollution during deserialization.
    
    // Try to parse the data - this might trigger evaluation if structured correctly
    let parsed0 = null
    let parsed1 = null
    
    try {
      if (data0) {
        parsed0 = JSON.parse(data0 as string)
      }
      if (data1) {
        parsed1 = JSON.parse(data1 as string)
      }
    } catch (e) {
      // If parsing fails, use raw data
    }
    
    return {
      success: true,
      received: {
        field1: parsed1 || data1,
        field0: parsed0 || data0
      },
      message: 'Data processed (vulnerable endpoint)'
    }
  } catch (error) {
    // Return error message which might contain command output if code executed
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : undefined
    }
  }
}

