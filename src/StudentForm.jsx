import React, { useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';

const StudentForm = ({ addStudent }) => {
  const [student, setStudent] = useState({
    name: '',
    studentId: '',
    classes: [],
    timestamp: '',
    location: '',
    branch: '',
    remarks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleClassChange = (e) => {
    const {
      target: { value },
    } = e;
    setStudent({
      ...student,
      classes: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(student);
    setStudent({
      name: '',
      studentId: '',
      classes: [],
      timestamp: '',
      location: '',
      branch: '',
      remarks: '',
    });
  };

  const classesOptions = [
    'basic english',
    'speaking and listening',
    'ielts',
    'tofel',
    'ged',
  ];
  const branches = [
    'mandalay',
    'yangon',
    'taungyi',
    'mawlamyaing',
    'naypyitaw',
  ];

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={student.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Student ID"
        variant="outlined"
        name="studentId"
        value={student.studentId}
        onChange={handleChange}
        required
      />
      <FormControl>
        <InputLabel id="classes-label">Classes</InputLabel>
        <Select
          labelId="classes-label"
          multiple
          value={student.classes}
          onChange={handleClassChange}
          input={<OutlinedInput label="Classes" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {classesOptions.map((className) => (
            <MenuItem key={className} value={className}>
              <Checkbox checked={student.classes.indexOf(className) > -1} />
              <ListItemText primary={className} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Timestamp"
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        name="timestamp"
        value={student.timestamp}
        onChange={handleChange}
        required
      />
      <TextField
        label="Location"
        variant="outlined"
        name="location"
        value={student.location}
        onChange={handleChange}
        required
      />
      <FormControl>
        <InputLabel id="branch-label">Branch</InputLabel>
        <Select
          labelId="branch-label"
          value={student.branch}
          onChange={handleChange}
          name="branch"
          required
        >
          {branches.map((branch) => (
            <MenuItem key={branch} value={branch}>
              {branch.charAt(0).toUpperCase() + branch.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Remarks"
        variant="outlined"
        multiline
        rows={4}
        name="remarks"
        value={student.remarks}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Student
      </Button>
    </form>
  );
};

export default StudentForm;
