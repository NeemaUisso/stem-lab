import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const UploadPracticalForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    topic: '',
    objective: '',
    description: '',
    difficulty: 'medium',
    tags: '',
    image: null,
    tools: '',
    materialImages: [],
    simulationConfig: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      if (name === 'materialImages') {
        setFormData((prev) => ({ ...prev, [name]: [...files] }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Parse tags from comma-separated string into array
    const tagsArray = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    data.append('tags', JSON.stringify(tagsArray));

    for (const key in formData) {
      if (key === 'tags') continue; // already appended
      if (formData[key]) {
        if (key === 'materialImages') {
          formData[key].forEach((file) => {
            data.append('materialImages', file);
          });
        } else {
          data.append(key, formData[key]);
        }
      }
    }

    try {
      const response = await fetch('http://127.0.0.1:3000/api/practicals', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setSuccess(true);
        const result = await response.json();
        console.log('Form data submitted successfully:', result);
      } else {
        console.error('Upload failed with status:', response.status);
        setSuccess(false);
      }
    } catch (error) {
      console.error('Error uploading practical:', error);
      setSuccess(false);
    }
  };

  return (
    <Container className="py-4 mt-5 pt-5">
      <h2>Upload New Practical</h2>
      {success && <Alert variant="success">Practical uploaded successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                required
                placeholder="e.g. Simple Pendulum Experiment"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Subject</Form.Label>
              <Form.Select name="subject" required value={formData.subject} onChange={handleChange}>
                <option value="">Select subject</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Topic</Form.Label>
              <Form.Control
                name="topic"
                required
                placeholder="e.g. Mechanics, Acids and Bases, Human Respiration"
                value={formData.topic}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Objective</Form.Label>
              <Form.Control
                as="textarea"
                name="objective"
                required
                placeholder="Brief purpose of the practical"
                value={formData.objective}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Description / Procedure</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="description"
                required
                placeholder="Step-by-step procedure of the experiment"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Difficulty</Form.Label>
              <Form.Select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                name="tags"
                placeholder="e.g. motion, acid-base, cells"
                value={formData.tags}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <hr />

        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Cover Image</Form.Label>
              <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Materials / Tools Required</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="tools"
                placeholder="List all materials/tools used in this experiment"
                value={formData.tools}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Upload Images of Materials/Tools</Form.Label>
              <Form.Control
                type="file"
                name="materialImages"
                accept="image/*"
                multiple
                onChange={handleChange}
              />
              <Form.Text muted>You can select multiple images</Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mt-4">
          <Form.Label>Simulation Configuration (optional)</Form.Label>
          <Form.Control
            as="textarea"
            name="simulationConfig"
            placeholder='e.g. JSON or code that configures the simulation'
            rows={4}
            value={formData.simulationConfig}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-4">
          Upload Practical
        </Button>
      </Form>
    </Container>
  );
};

export default UploadPracticalForm;
