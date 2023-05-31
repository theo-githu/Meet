import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);

    const colors = ['#2364aa', '#3da5d9', '#73bfb8', '#fec601', '#ea7317'];

    useEffect(() => { 
        setData(getData()); 
    }, [events]);

    const getData = () => {
        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

        const data = genres.map((genre, index) => {
            const value = events.filter(({ summary }) => summary.split(" ").includes(genre)).length;
            return { name: genre, value, fill: colors[index] };
        });
        return data;
    };



    return (
        <ResponsiveContainer height={300}>
          <PieChart width={400} height={400}>
            <Tooltip />
            <Legend verticalAlign="bottom" layout="horizontal"  formatter={(value, entry, index) => <span style={{ color: entry.color }}>{entry.payload.name}</span>} />
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                labelLine={false}
                outerRadius={80}
                label={({ percent }) => `${(percent * 100).toFixed(0)} %`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer >
      );
}

export default EventGenre;