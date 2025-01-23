import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createUser, getUserById, updateUser } from '../../services/user.service';

const AddEditUser = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get('id');

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const data = await getUserById(userId);
        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          birthDate: data.birthDate,
          password: '',
        });
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (userId) {
        // Si le mot de passe est vide, ne pas le transmettre pour la mise à jour
        const updatedUser = user.password
          ? user
          : { ...user, password: undefined };

        await updateUser(userId, updatedUser);
      } else {
        await createUser(user);
      }

      navigate('/users');
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {userId ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Prénom"
          fullWidth
          margin="normal"
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <TextField
          label="Nom"
          fullWidth
          margin="normal"
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          label="Date de Naissance"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={user.birthDate}
          onChange={(e) => setUser({ ...user, birthDate: e.target.value })}
        />
        <TextField
          label={userId ? 'Nouveau mot de passe' : 'Mot de passe'}
          type="password"
          fullWidth
          margin="normal"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? 'En cours...' : userId ? 'Modifier' : 'Ajouter'}
        </Button>
      </form>
    </Container>
  );
};

export default AddEditUser;
