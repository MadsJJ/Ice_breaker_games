import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const UserData = () => {
  // Here, we summon the stateful magic to hold our treasures
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // A secret chamber for our fetching ritual
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // Spread the doc data like stardust
      }));
      setUsers(usersList); // Ensnare the data in our stateful magic
    };

    fetchData();
  }, []);

  // And now, to display our treasures in a scroll of divinity
  return (
    <div>
      <h2>Behold, the Users:</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {/* A touch of elegance in presenting our data */}
              <strong>ID:</strong> {user.id}, <strong>Data:</strong>{" "}
              {JSON.stringify(user, null, 2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>The scroll is empty, as no users have been summoned yet.</p>
      )}
    </div>
  );
};

export default UserData;
