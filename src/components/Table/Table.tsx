import React, { useState } from 'react';
import classNames from 'classnames';
import { getSortedData } from 'controllers/helpers';
import style from './Table.module.scss';

interface Server {
    name: string;
    distance: number;
    sort: Function;
}

interface Props {
    data: Server[];
}

const Table = ({ data }: Props) => {
    const [sort, setSort] = useState({ by: '', direction: 1});

    const theadData = [
        { title: 'Name', sortBy: 'name' },
        { title: 'Distance', sortBy: 'distance' }
    ];

    const setSortBy = (sortBy: string) => {
        if (sortBy === null) return;
        return setSort({ by: sortBy, direction: sort.by === sortBy ? -1 * sort.direction : 1})
    };

    return (
        <table className={style.table}>
            <thead>
                {theadData.map(({ title, sortBy }) =>
                    <th
                        key={title}
                        className={style.theadWithArrow}
                        onClick={() => setSortBy(sortBy)}
                    >
                        <td>
                            {title}
                            {sortBy === sort.by && (
                                <span className={classNames(style.arrowUp, {[style.arrowDown]: sort.direction === -1} )} />
                            )}
                        </td>

                    </th>
                )}
            </thead>
            <tbody>
                {
                    getSortedData(data, sort.by, sort.direction).map((server: Server) => {
                        const { name, distance} = server;
                        return (
                            <tr key={`${name}-${distance}`}>
                                <td>{name}</td>
                                <td>{distance}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
};

export default Table;