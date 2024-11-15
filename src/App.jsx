import React, { useState, useMemo } from 'react';
import { Container, Table, Title, Stack, Paper, Badge } from '@mantine/core';
import subjectsData from './subjects.json';

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null); // Estado para el ramo seleccionado
  const subjects = subjectsData.subjects;

  // Agrupar materias por semestre
  const subjectsBySemester = useMemo(() => {
    const grouped = {};

    // Ordenar materias por semestre
    const sortedSubjects = [...subjects].sort((a, b) =>
      parseInt(a.semester) - parseInt(b.semester)
    );

    // Agrupar por semestre
    sortedSubjects.forEach((subject) => {
      if (!grouped[subject.semester]) {
        grouped[subject.semester] = [];
      }
      grouped[subject.semester].push(subject);
    });

    return grouped;
  }, [subjects]);

  // Obtener número máximo de semestres y máximo de materias por semestre
  const maxSemesters = Math.max(
    ...Object.keys(subjectsBySemester).map(Number)
  );
  const maxSubjectsPerSemester = Math.max(
    ...Object.values(subjectsBySemester).map((subjects) => subjects.length)
  );

  const handleClick = (subject) => {
    setSelectedSubject(subject === selectedSubject ? null : subject); // Desmarcar si se vuelve a hacer clic
  };

  const getSubjectColor = (subject) => {
    // Si el ramo está seleccionado, se pinta de naranja
    if (selectedSubject === subject) {
      return 'orange'; // Naranja para el ramo seleccionado
    }
    // Si el ramo es un "prev" de un ramo seleccionado, se pinta de rojo
    if (selectedSubject && selectedSubject.prev.includes(subject.name)) {
      return 'red'; // Rojo para los ramos previos
    }
    // Si el ramo es un "next" de un ramo seleccionado, se pinta de verde
    if (selectedSubject && selectedSubject.next.includes(subject.name)) {
      return 'green'; // Verde para los ramos siguientes
    }
    return 'white'; // Blanco si no es ninguno de los anteriores
  };

  return (
    <Container
      size="xl"
      padding="md"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Hace que ocupe el 100% de la altura de la pantalla
      }}
    >
      <Stack gap="xl" style={{ width: '100%', mixWidth: '1600px' }}>
        <Title ta="center" my="lg" order={1}>
          Malla Curricular
        </Title>

        <Table
          striped
          withTableBorder
          horizontalSpacing={0}
          verticalSpacing={0}
          style={{
            width: '100%', // Hace que la tabla ocupe el 100% del ancho disponible
            height: '80vh', // Ajusta la altura de la tabla a un 80% de la altura de la pantalla
            tableLayout: 'fixed', // Hace que las celdas se distribuyan uniformemente
            fontSize: '1rem',
          }}
        >
          <Table.Thead>
            <Table.Tr>
              {[...Array(maxSemesters)].map((_, index) => (
                <Table.Th
                  key={index}
                  ta="center"
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
                  <Stack gap={2} style={{ width: '100%', height: '100%' }}>
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
                            minWidth: '100px',
                            height: '100px',
                            justifyContent: 'center',
                            opacity: subject ? 1 : 0.3,
                            marginBottom: 0,
                            cursor: 'pointer',
                            backgroundColor: subject ? getSubjectColor(subject) : '#f9f9f9',
                          }}
                          onClick={() => handleClick(subject)}
                        >
                          {subject ? (
                            <>
                              <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '1rem' }}>
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
      </Stack>
    </Container>
  );
}

export default App;