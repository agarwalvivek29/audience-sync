// // 'use client'

// // import { useState, useRef } from 'react'
// // import Editor from "@monaco-editor/react"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// // export default function HTMLTemplateIDE() {
// //   const [variables, setVariables] = useState([
// //     { name: 'username', value: '' },
// //     { name: 'callback_url', value: '' }
// //   ])
// //   const [newVariable, setNewVariable] = useState('')
// //   const [previewData, setPreviewData] = useState({})
// //   const editorRef = useRef(null)

// //   const handleEditorDidMount = (editor, monaco) => {
// //     editorRef.current = editor
// //   }

// //   const addVariable = () => {
// //     if (newVariable && !variables.find(v => v.name === newVariable)) {
// //       setVariables([...variables, { name: newVariable, value: '' }])
// //       setNewVariable('')
// //     }
// //   }

// //   const updateVariable = (index, value) => {
// //     const updatedVariables = [...variables]
// //     updatedVariables[index].value = value
// //     setVariables(updatedVariables)
// //     setPreviewData({...previewData, [updatedVariables[index].name]: value})
// //   }

// //   const renderPreview = () => {
// //     if (!editorRef.current) return ''
// //     let preview = editorRef.current.getValue()
// //     variables.forEach(variable => {
// //       const regex = new RegExp(`{{${variable.name}}}`, 'g')
// //       preview = preview.replace(regex, previewData[variable.name] || `{{${variable.name}}}`)
// //     })
// //     return preview
// //   }

// //   return (
// //     <div className="mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4">Create Templates</h1>
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Variables</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             {variables.map((variable, index) => (
// //               <div key={index} className="mb-2">
// //                 <Label htmlFor={`var-${index}`}>{variable.name}</Label>
// //                 <Input
// //                   id={`var-${index}`}
// //                   value={variable.value}
// //                   onChange={(e) => updateVariable(index, e.target.value)}
// //                   placeholder={`Enter ${variable.name}`}
// //                 />
// //               </div>
// //             ))}
// //             <div className="mt-4">
// //               <Input
// //                 value={newVariable}
// //                 onChange={(e) => setNewVariable(e.target.value)}
// //                 placeholder="New variable name"
// //                 className="mb-2"
// //               />
// //               <Button onClick={addVariable}>Add Variable</Button>
// //             </div>
// //           </CardContent>
// //         </Card>
// //         <Card className="col-span-2">
// //           <CardHeader>
// //             <CardTitle>HTML Template</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <Editor
// //               height="400px"
// //               defaultLanguage="html"
// //               defaultValue="<h1>Hello, {{username}}!</h1>
// // <p>Click <a href='{{callback_url}}'>here</a> to continue.</p>"
// //               onMount={handleEditorDidMount}
// //               options={{
// //                 minimap: { enabled: false },
// //                 fontSize: 14,
// //               }}
// //             />
// //           </CardContent>
// //         </Card>
// //         <Card className="col-span-3">
// //           <CardHeader>
// //             <CardTitle>Preview</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div 
// //               className="border p-4 h-64 overflow-auto bg-white"
// //               dangerouslySetInnerHTML={{ __html: renderPreview() }}
// //             />
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   )
// // }

// 'use client'

// import { useState, useRef } from 'react'
// import Editor from "@monaco-editor/react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// export default function HTMLTemplateIDE() {
//   const [templateName, setTemplateName] = useState('')
//   const [variables, setVariables] = useState([])
//   const [newVariable, setNewVariable] = useState('')
//   const [prompt, setPrompt] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [previewData, setPreviewData] = useState({})
//   const editorRef = useRef(null)

//   const handleEditorDidMount = (editor, monaco) => {
//     editorRef.current = editor
//   }

//   const addVariable = () => {
//     if (newVariable && !variables.find(v => v.name === newVariable)) {
//       setVariables([...variables, { name: newVariable, value: '' }])
//       setNewVariable('')
//     }
//   }

//   const updateVariable = (index, value) => {
//     const updatedVariables = [...variables]
//     updatedVariables[index].value = value
//     setVariables(updatedVariables)
//     setPreviewData({ ...previewData, [updatedVariables[index].name]: value })
//   }

//   const renderPreview = () => {
//     if (!editorRef.current) return ''
//     let preview = editorRef.current.getValue()
//     variables.forEach(variable => {
//       const regex = new RegExp(`{{${variable.name}}}`, 'g')
//       preview = preview.replace(regex, previewData[variable.name] || `{{${variable.name}}}`)
//     })
//     return preview
//   }

//   const handleGenerate = async () => {
//     setLoading(true)
//     try {
//       const response = await fetch('/api/generate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt })
//       })
//       const data = await response.json()
//       if (editorRef.current) {
//         editorRef.current.setValue(editorRef.current.getValue() + '\n' + data.generatedContent)
//       }
//     } catch (error) {
//       console.error('Error generating template:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create Templates</h1>
//       <div className="mb-4">
//         <Label htmlFor="template-name">Template Name</Label>
//         <div className="flex gap-2">
//           <Input
//             id="template-name"
//             value={templateName}
//             onChange={(e) => setTemplateName(e.target.value)}
//             placeholder="Enter template name"
//           />
//           <Button onClick={() => console.log('Saved template:', templateName)}>
//             Save
//           </Button>
//         </div>
//       </div>
//       <div className="mb-4">
//         <Label htmlFor="prompt-field">Prompt</Label>
//         <div className="flex gap-2">
//           <Input
//             id="prompt-field"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="Enter prompt"
//           />
//           <Button onClick={handleGenerate} disabled={loading}>
//             {loading ? 'Generating...' : 'Generate'}
//           </Button>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card className="md:col-span-1">
//           <CardHeader>
//             <CardTitle>Variables</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {variables.map((variable, index) => (
//               <div key={index} className="flex items-center mb-2 gap-2">
//                 <Label htmlFor={`var-${index}`} className="min-w-[100px]">
//                   {variable.name}
//                 </Label>
//                 <Input
//                   id={`var-${index}`}
//                   value={variable.value}
//                   onChange={(e) => updateVariable(index, e.target.value)}
//                   placeholder={`Enter ${variable.name}`}
//                 />
//               </div>
//             ))}
//             <div className="mt-4">
//               <Input
//                 value={newVariable}
//                 onChange={(e) => setNewVariable(e.target.value)}
//                 placeholder="New variable name"
//                 className="mb-2"
//               />
//               <Button onClick={addVariable}>Add Variable</Button>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="md:col-span-2 grid grid-cols-2">
//           <div className="pr-2">
//             <CardHeader>
//               <CardTitle>HTML Template</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Editor
//                 height="400px"
//                 defaultLanguage="html"
//                 defaultValue=""
//                 onMount={handleEditorDidMount}
//                 options={{
//                   minimap: { enabled: false },
//                   fontSize: 14,
//                 }}
//               />
//             </CardContent>
//           </div>
//           <div className="pl-2">
//             <CardHeader>
//               <CardTitle>Preview</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div
//                 className="border p-4 h-64 overflow-auto bg-white"
//                 dangerouslySetInnerHTML={{ __html: renderPreview() }}
//               />
//             </CardContent>
//           </div>
//         </Card>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useRef } from 'react'
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HTMLTemplateIDE() {
  const [templateName, setTemplateName] = useState('')
  const [variables, setVariables] = useState([])
  const [newVariable, setNewVariable] = useState('')
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [previewData, setPreviewData] = useState({})
  const editorRef = useRef(null)

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor
  }

  const addVariable = () => {
    if (newVariable && !variables.find(v => v.name === newVariable)) {
      setVariables([...variables, { name: newVariable, value: '' }])
      setNewVariable('')
    }
  }

  const updateVariable = (index, value) => {
    const updatedVariables = [...variables]
    updatedVariables[index].value = value
    setVariables(updatedVariables)
    setPreviewData({ ...previewData, [updatedVariables[index].name]: value })
  }

  const renderPreview = () => {
    if (!editorRef.current) return ''
    let preview = editorRef.current.getValue()
    variables.forEach(variable => {
      const regex = new RegExp(`{{${variable.name}}}`, 'g')
      preview = preview.replace(regex, previewData[variable.name] || `{{${variable.name}}}`)
    })
    return preview
  }

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8083/template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "moto": [
                prompt
            ],
            "company_name": "Zomato",
            "description": "Food Delivery & Restaurant Discovery",
            "logo": "https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png?fit=around|198:42&crop=198:42;*,*",
            "url": "https://zomato.com"
        })
      })
      const data = await response.json()
      if (editorRef.current) {
        editorRef.current.setValue(editorRef.current.getValue() + '\n' + data.candidates[0].content.parts[0].text)
      }
    } catch (error) {
      console.error('Error generating template:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Templates</h1>
      <div className="mb-4">
        <Label htmlFor="template-name">Template Name</Label>
        <div className="flex gap-2">
          <Input
            id="template-name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Enter template name"
          />
          <Button onClick={() => console.log('Saved template:', templateName)}>
            Save
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor="prompt-field">Prompt</Label>
        <div className="flex gap-2">
          <Input
            id="prompt-field"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter prompt"
          />
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>HTML Template</CardTitle>
          </CardHeader>
          <CardContent>
            <Editor
              height="400px"
              defaultLanguage="html"
              defaultValue=""
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="border p-4 h-96 overflow-auto bg-white"
              dangerouslySetInnerHTML={{ __html: renderPreview() }}
            />
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Variables</CardTitle>
        </CardHeader>
        <CardContent>
          {variables.map((variable, index) => (
            <div key={index} className="flex items-center mb-2 gap-2">
              <Label htmlFor={`var-${index}`} className="min-w-[100px]">
                {variable.name}
              </Label>
              <Input
                id={`var-${index}`}
                value={variable.value}
                onChange={(e) => updateVariable(index, e.target.value)}
                placeholder={`Enter ${variable.name}`}
              />
            </div>
          ))}
          <div className="mt-4">
            <Input
              value={newVariable}
              onChange={(e) => setNewVariable(e.target.value)}
              placeholder="New variable name"
              className="mb-2"
            />
            <Button onClick={addVariable}>Add Variable</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
