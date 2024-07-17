import React, { useState } from 'react';
import StudentForm from './StudentForm';
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const App = () => {
  const [students, setStudents] = useState([]);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'students.xlsx');
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Student Records
      </Typography>
      <StudentForm addStudent={addStudent} />
      <Button
        onClick={exportToExcel}
        variant="contained"
        color="secondary"
        style={{ marginTop: '1rem' }}
      >
        Export to Excel
      </Button>
      <List>
        {students.map((student, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${student.name} - ${student.studentId}`}
              secondary={`${student.classes.join(', ')} - ${
                student.timestamp
              } - ${student.location} - ${student.branch} - ${student.remarks}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
