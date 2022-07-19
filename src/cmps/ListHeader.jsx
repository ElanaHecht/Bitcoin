import { Component } from 'react';
import { NiceButton } from '../cmps/NiceButton';
import { Link } from 'react-router-dom';

export class ListHeader extends Component {

    state = {
        status: '',
        sort: 'Created'
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState({ [field]: value }, () => {
            this.props.onChangeFilter(this.state)
        })
    }

    render() {
        const { sort } = this.state
        return (
            <section className="list-header flex align-center space-between">
                <Link to="/todo/edit" className="nice-button" title="Add a new toDo">Add toDo</Link>
                <div className="radio-btn" title="Select an option to filter toDo list">
                    <label htmlFor="all">
                        <input onChange={this.handleChange} type="radio" name="status" id="all" value="all" />
                        All</label>
                    <label htmlFor="active">
                        <input onChange={this.handleChange} type="radio" name="status" id="active" value="active" />
                        Active</label>
                    <label htmlFor="complete">
                        <input onChange={this.handleChange} type="radio" name="status" id="complete" value="complete" />
                        Complete</label>
                </div>
                <div className="sort-todos flex align-center space-between">
                    <p>Sort by:</p>
                    <select onChange={this.handleChange} value={sort} name="sort" id="sort">
                        <option value="Created">Created</option>
                        <option value="Title">Title</option>
                    </select>
                </div>
                <NiceButton onClick={this.props.onRemoveComplete} title="Remove all completed toDos">Clear complete</NiceButton>
            </section>
        )
    }
}
