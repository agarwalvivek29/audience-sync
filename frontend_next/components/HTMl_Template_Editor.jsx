'use client'

import { useState, useRef } from 'react'
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HTMLTemplateIDE() {
  const [variables, setVariables] = useState([
    { name: 'username', value: '' },
    { name: 'callback_url', value: '' }
  ])
  const [newVariable, setNewVariable] = useState('')
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
    setPreviewData({...previewData, [updatedVariables[index].name]: value})
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

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Templates</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Variables</CardTitle>
          </CardHeader>
          <CardContent>
            {variables.map((variable, index) => (
              <div key={index} className="mb-2">
                <Label htmlFor={`var-${index}`}>{variable.name}</Label>
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
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>HTML Template</CardTitle>
          </CardHeader>
          <CardContent>
            <Editor
              height="400px"
              defaultLanguage="html"
              defaultValue="<h1>Hello, {{username}}!</h1>
<p>Click <a href='{{callback_url}}'>here</a> to continue.</p>"
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="border p-4 h-64 overflow-auto bg-white"
              dangerouslySetInnerHTML={{ __html: renderPreview() }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

