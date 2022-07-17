import { Component } from 'react';

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
            const {term} = this.state;
        return (
            <section className="todo-filter" >
                <label htmlFor="term">
                    Search ToDos
                    <input type="search" onChange={this.handleChange} name="term" id="term" value={term}/>
                </label>
            </section>
        )
    }
}
