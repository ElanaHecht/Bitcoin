import { Component } from 'react';
import { ReactComponent as SearchIcon } from '../assets/images/search.svg'

export class ToDoFilter extends Component {

    state = {
        term: ''
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState({ [field]: value }, () => {
            this.props.onChangeFilter(this.state)
        })
    }

    render() {
        const { term } = this.state;
        
        return (
            <section className="todo-filter" title="Search toDos by title">
                <label htmlFor="term">
                    <SearchIcon className='search-icon' />
                </label>
                <input type="search" onChange={this.handleChange} name="term" id="term" value={term} />
            </section>
        )
    }
}
