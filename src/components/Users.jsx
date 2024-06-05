import { useEffect, useState } from "react";
import "./Users.css";

const UsersList = () => {
  const urlApi = "https://randomuser.me/api/?results=5";
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(urlApi)
      .then(response => response.json())
      .then(data => setUsers(data.results))
      .catch(error => console.log('Hubo un error ' + error));
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Listado: </h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <div className="tarjeta">
              <div className="contenidoUsuario">
                <img src={user.picture.thumbnail} alt="profile pic"></img>
                <div className="nombre">{user.name.first}</div>
              </div>
              <button onClick={() => openModal(user)}>
                Más información
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} closeModal={closeModal} selectedUser={selectedUser} />
      )}
    </div>
  );
};

const Modal = ({ isModalOpen, closeModal, selectedUser }) => {
  return (
    <div 
      className={`superposicion ${isModalOpen ? 'aparecer' : 'desaparecer'}`} 
      onAnimationEnd={(e) => {
        if (!isModalOpen && e.animationName === 'desaparecer') {
          closeModal();
        }
      }}
    >
      <div className="contenidoModal">
        {selectedUser && (
          <>
            <h2>Información del usuario</h2>
            <img src={selectedUser.picture.large} alt="profile pic"></img>
            <p><b>Nombre</b>: {selectedUser.name.first} {selectedUser.name.last}</p>
            <p><b>Email</b>: {selectedUser.email}</p>
            <p><b>Numero de teléfono</b>: {selectedUser.phone}</p>
            <p><b>Locacion</b>: {selectedUser.location.city}, {selectedUser.location.country}</p>
          </>
        )}
        <button onClick={closeModal}>Cerrar</button>
      </div>
    </div>
  );
};

export default UsersList;
