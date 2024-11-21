Sub ExportToJson()
    Dim ws As Worksheet
    Dim rng As Range
    Dim jsonFile As Object
    Dim jsonArray As Object
    Dim i As Long, j As Long

    ' Set the worksheet and starting cell
    Set ws = ThisWorkbook.Sheets("Sheet5") ' Change "Sheet1" to the correct sheet name
    Set rng = ws.Range("C6").CurrentRegion ' Start from cell C6 and include all data in the current region

    ' Create JSON file in the same directory as the workbook
    Set jsonFile = CreateObject("Scripting.FileSystemObject").CreateTextFile(ThisWorkbook.Path & "\data.json", True)
    jsonFile.Write "[" ' Start the JSON array

    ' Loop through each row of data (starting from the second row in the range)
    For i = 2 To rng.Rows.Count
        Dim item As Object
        Set item = CreateObject("Scripting.Dictionary")

        ' Add each column as a key-value pair in the item dictionary
        item("Element") = rng.Cells(i, 1).value
        item("Symbol") = rng.Cells(i, 2).value
        item("Mass Number") = rng.Cells(i, 3).value
        item("Atomic Mass") = rng.Cells(i, 4).value
        item("Number of Protons") = rng.Cells(i, 5).value
        item("Number of Neutrons") = rng.Cells(i, 6).value
        item("Expected Mass") = rng.Cells(i, 7).value
        item("Mass Defect") = rng.Cells(i, 8).value
        item("Binding Energy") = rng.Cells(i, 9).value
        item("Binding Energy per Nucleon") = rng.Cells(i, 10).value
        item("Stability") = rng.Cells(i, 11).value

        ' Write the serialized item dictionary to the JSON file
        jsonFile.Write ConvertToJson(item)
        
        ' Add a comma after each item except the last
        If i < rng.Rows.Count Then jsonFile.Write ","
    Next i

    jsonFile.Write "]" ' End the JSON array
    jsonFile.Close

    MsgBox "JSON file created successfully at " & ThisWorkbook.Path & "\data.json"
End Sub

' Function to convert a Dictionary to JSON format
Function ConvertToJson(item As Object) As String
    Dim json As String
    json = "{"
    Dim key As Variant
    For Each key In item.Keys
        json = json & """" & key & """:" & FormatValue(item(key)) & ","
    Next key
    json = Left(json, Len(json) - 1) ' Remove the trailing comma
    json = json & "}"
    ConvertToJson = json
End Function

' Function to format values for JSON output
Function FormatValue(value As Variant) As String
    Select Case VarType(value)
        Case vbString
            FormatValue = """" & value & """"
        Case vbBoolean
            FormatValue = IIf(value, "true", "false")
        Case Else
            FormatValue = value
    End Select
End Function

