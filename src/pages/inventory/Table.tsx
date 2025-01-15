import React from 'react'

function Table() {
  return (
    <div className='table-con'>
        <table className="styled-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Mark</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Dom</td>
            <td>6000</td>
            <td>100</td>
        </tr>
        <tr className="active-row">
            <td>Melissa</td>
            <td>5150</td>
            <td>50</td>
        </tr>
        <tr >
            <td>Melissa</td>
            <td>5150</td>
            <td>50</td>
        </tr>
        <tr className="active-row">
            <td>Melissa</td>
            <td>5150</td>
            <td>50</td>
        </tr>
        
    </tbody>
</table>
    </div>
  )
}

export default Table