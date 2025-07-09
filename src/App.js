import './App.css';
import Customer from './components/Customer'

const customers = [
{
  'id': 1,
  'image': 'https://randomuser.me/api/portraits/men/1.jpg',
  'name': 'John Smith',
  'birthday': '22/Dec/1996',
  'gender' : 'Male',
  'job' : 'Student'
},
{
  'id': 2,
  'image': 'https://randomuser.me/api/portraits/women/1.jpg',
  'name': 'Emma Wilson',
  'birthday': '15/Aug/1995',
  'gender' : 'Female',
  'job' : 'Software Developer'
},
{
  'id': 3,
  'image': 'https://randomuser.me/api/portraits/women/2.jpg',
  'name': 'James Brown',
  'birthday': '03/Apr/1997',
  'gender' : 'Male',
  'job' : 'Graphic Designer'
}
]

function App() {
  return (
    <div>
      {
        customers.map(c => {
          return (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          )
        })
      }
    </div>
  );
}

export default App;
