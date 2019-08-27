import React, { Component } from 'react';

export class Pagination extends Component {

    render() {
        const { selectedPage, pageCount } = this.props;
        return (
            <ul className="pagination">
                <li className={(selectedPage === 1 ? 'disabled' : '') + ' page-item'}>
                    <p className='page-link' onClick={() => this.props.onClick(1)}>{'<<'}</p>
                </li>
                <li className={(selectedPage === 1 ? 'disabled' : '') + ' page-item'}>
                    <p className='page-link' onClick={() => this.props.onClick(selectedPage - 1)}>{'<'}</p>
                </li>
                {Array.from(new Array(pageCount), (x,i) => i + 1).map((number) =>
                    <li key={number} className={(selectedPage === number ? 'active' : '') + ' page-item'}>
                        <p className='page-link' onClick={() => this.props.onClick(number)}>{number}</p>
                    </li>
                )}
                <li className={(selectedPage === pageCount ? 'disabled' : '') + ' page-item'}>
                    <p className='page-link' onClick={() => this.props.onClick(selectedPage + 1)}>{'>'}</p>
                </li>
                <li className={(selectedPage === pageCount ? 'disabled' : '') + ' page-item'}>
                    <p className='page-link' onClick={() => this.props.onClick(pageCount)}>{'>>'}</p>
                </li>
            </ul>
        );
    }
}