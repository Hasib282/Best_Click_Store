import dynamic from "next/dynamic";
import Link from "next/link";


const MechanicLayout = dynamic(()=>import('../layouts/mechaniclayout'),{
  ssr:false,
})

const Title = dynamic(()=>import('../layouts/title'),{
  ssr:false,
})

export default function AddService() {
  return (
    <>
      <Title page='Add Service'></Title>
      <MechanicLayout>
        <section id="addservice" >
            <h1 align='center'>Add Service</h1>
            <form>
            <table>
                    <tr>
                        <td width={250}>
                            
                        </td>
                        <td>
                            <label for='service'>Select service </label>
                            
                            <select id="service">
                                <option>Fridge Repairing</option>
                                <option>AC Repairing</option>
                                <option>Tv Repairing</option>
                            </select>
                            

                            <p align='center'><input type="submit" name="registration" value='Submit'></input></p>
                        </td>
                        <td >
                            
                        </td>
                    </tr>
                </table>
            </form>
            <p align='right'><Link href='./mechanichome'>Back</Link></p>
            
        </section>
      </MechanicLayout>
    </>
  )
}