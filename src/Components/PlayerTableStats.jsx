export default function PlayerTableStats({ headers, rows }) {
  console.log(rows)
  return (
    <>
      <table>
        <thead>
          <tr key={'header'}>
            {headers.map(key => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map(item => (
            <tr key={item.id}>
              {Object.values(item).map(val => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
