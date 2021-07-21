import { useState } from "react";

const Home = () => {
  // let name = 'mario';
  const [name, setName] = useState('mario');
  const [age, setAge] = useState(25);
  const [userString, setUserString] = useState('');
  const [searchString, setSearchString] = useState('aeiou');

  const handleSubmit = (e) => {
    e.preventDefault();
    // name = 'luigi';
    setName('luigi');
    setAge(30);
    const searchSet = { userString, searchString };

    fetch('/api/cal', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(searchSet)
    }).then(() => {
      console.log('new blog added');
    })
  }

  return (
    <div className="create">
      <h2>Homepage</h2>
      <p>{ name } is { age } years old</p>
      <form onSubmit={handleSubmit}>
        <label>User String:</label>
        <input
          type="text"
          required
          value={userString}
          onChange={(e) => setUserString(e.target.value)}
        />
        <label>Search String:</label>
        <input
          type="text"
          required
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <button>Click me</button>
      </form>      
    </div>
  );
}
 
export default Home;