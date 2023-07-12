import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  //Метод обробки сабміту форми - додаємо дані в state (дані отримуємо з компонента ContactForm)
  formSubmitHandler = data => {
    const { contacts } = this.state;
    console.log(data);
    //Заборона додавати контакти, імена яких вже присутні у телефонній книзі.
    if (contacts.some(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    this.setState({
      contacts: [
        ...contacts,
        { id: this.generetedId(), name: data.name, number: data.number },
      ],
    });
  };

  //Метод генерації id. Функція nanoid()  приймає необов'язковий аргумент, що задає довжину id
  generetedId = () => {
    return nanoid(5);
  };

  // Метод оновлення полів фільтру
  handleChangeFilter = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  //Метод фільтрації контактів
  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  //Метод видалення контакту зі списку контактів
  deleteContact = deleteId => {
    this.setState(PrevState => ({
      contacts: PrevState.contacts.filter(contact => contact.id !== deleteId),
    }));
    this.setState({ filter: '' });
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#010101',
        }}
      >
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2 className={css.subtitle}>Contacts</h2>
        <p className={css.total}>
          Total contacts:
          <span className={css.total_count}> {this.state.contacts.length}</span>
        </p>
        <Filter value={this.state.filter} onChange={this.handleChangeFilter} />
        <ContactList
          filteredContacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
