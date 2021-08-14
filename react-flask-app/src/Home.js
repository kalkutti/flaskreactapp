import { useState } from "react";
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

const Home = () => {
  // let name = 'mario';
  const [name, setName] = useState('mario');
  const [age, setAge] = useState(25);
  const [userString, setUserString] = useState('');
  const [searchString, setSearchString] = useState('aeiou');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [durationValue, setDurationValue] = useState('');
  const [priceValue, setPriceValue] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // name = 'luigi';
    setName('luigi');
    setAge(30);
    const searchSet = { userString, searchString, selectedDate, durationValue, priceValue };

    fetch('/api/cal', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(searchSet)
    }).then(() => {
      console.log('new blog added');
    })
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Finish Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <br />
          <label>Duration:</label>
          <input
            type="text"
            required
            value={durationValue}
            onChange={(e) => setDurationValue(e.target.value)}
          />
          <label>Price:</label>
          <input
            type="text"
            required
            value={priceValue}
            onChange={(e) => setPriceValue(e.target.value)}
          />
          <button>Click me</button>
        </form>      
      </div>
    </MuiPickersUtilsProvider>
  );
}
 
export default Home;