import React, { useState, useMemo } from 'react';
import { Container, Table, Title, Stack, Paper, Badge } from '@mantine/core';
import './App.css';
import subjectsData from './subjects.json';

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const subjects = subjectsData.subjects;

  const subjectsBySemester = useMemo(() => {
    const grouped = {};
    const sortedSubjects = [...subjects].sort(
      (a, b) => parseInt(a.semester) - parseInt(b.semester)
    );
    sortedSubjects.forEach((subject) => {
      if (!grouped[subject.semester]) {
        grouped[subject.semester] = [];
      }
      grouped[subject.semester].push(subject);
    });
    return grouped;
  }, [subjects]);

  const maxSemesters = Math.max(...Object.keys(subjectsBySemester).map(Number));
  const maxSubjectsPerSemester = Math.max(
    ...Object.values(subjectsBySemester).map((subjects) => subjects.length)
  );

  const handleClick = (subject) => {
    setSelectedSubject(subject === selectedSubject ? null : subject);
  };

  const getSubjectColor = (subject) => {
    if (selectedSubject === subject) return 'orange';
    if (selectedSubject && selectedSubject.prev.includes(subject.name)) return 'red';
    if (selectedSubject && selectedSubject.next.includes(subject.name)) return 'green';
    return 'white';
  };

  return (
    <Container
      fluid
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Title align="center" my="lg" order={1}>
        Malla Curricular ICINF 2020
      </Title>

      <Table
        striped
        withTableBorder
        style={{
          width: '100%',
          height: '80vh',
          tableLayout: 'fixed',
          fontSize: '1rem',
        }}
      >
        <Table.Thead>
          <Table.Tr>
            {[...Array(maxSemesters)].map((_, index) => (
              <Table.Th
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '15px',
                  backgroundColor: '#f0f0f0',
                  fontWeight: 'bold',
                }}
              >
                Semestre {index + 1}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            {[...Array(maxSemesters)].map((_, semesterIndex) => (
              <Table.Td
                key={semesterIndex}
                style={{
                  padding: 0,
                  verticalAlign: 'top',
                  width: `${100 / maxSemesters}%`,
                }}
              >
                <Stack gap={0} style={{ height: '100%' }}>
                  {[...Array(maxSubjectsPerSemester)].map((_, subjectIndex) => {
                    const subject = subjectsBySemester[semesterIndex + 1]?.[subjectIndex];
                    return (
                      <Paper
                        key={subjectIndex}
                        withBorder
                        radius={0}
                        p="sm"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          width: '100%',
                          height: '100px',
                          justifyContent: 'center',
                          backgroundColor: subject ? getSubjectColor(subject) : '#f9f9f9',
                          opacity: subject ? 1 : 0.3,
                          cursor: subject ? 'pointer' : 'default',
                        }}
                        onClick={() => subject && handleClick(subject)}
                      >
                        {subject ? (
                          <>
                            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                              {subject.name}
                            </div>
                            {subject.type && (
                              <Badge color="gray" variant="light" size="sm">
                                {subject.type}
                              </Badge>
                            )}
                          </>
                        ) : (
                          <div style={{ color: 'lightgray', fontSize: '0.9rem' }}>
                            Sin asignatura
                          </div>
                        )}
                      </Paper>
                    );
                  })}
                </Stack>
              </Table.Td>
            ))}
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Container>
  );
}

export default App;