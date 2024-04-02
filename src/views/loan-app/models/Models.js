import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilBell,
  cilCheck,
  cilX,
} from '@coreui/icons'
import axios from 'axios'

const Models = () => {
  const [model, setModel] = useState('Linear Regression')
  // const [plot, setPlot] = useState(null)

  // const fetchPlot = () => {
  //   axios.get('http://localhost:3001/plot').then((res) => {
  //     setPlot(res.data)
  //   })
  // }

  // useEffect(() => {
  //   fetchPlot()
  // }, [])

  const plot = `
  <!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>
  <div id="plot"></div>

  <script>
    // Data for the plot
    var data = [
      {
        x: [1, 2, 3, 4, 5],
        y: [1, 4, 9, 16, 25],
        type: 'scatter',
        mode: 'lines',
        name: 'Line Plot'
      }
    ];

    // Layout options for the plot
    var layout = {
      title: 'Interactive Plot',
      xaxis: {
        title: 'X-axis'
      },
      yaxis: {
        title: 'Y-axis'
      }
    };

    // Create the plot
    Plotly.newPlot('plot', data, layout);

    // Update the plot with new data when a button is clicked
    function updatePlot() {
      var newData = [
        {
          x: [1, 2, 3, 4, 5],
          y: [1, 8, 27, 64, 125],
          type: 'scatter',
          mode: 'markers',
          name: 'Scatter Plot'
        }
      ];

      Plotly.react('plot', newData, layout);
    }
  </script>

  <button onclick="updatePlot()">Update Plot</button>
</body>
</html>
  `

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="d-none d-md-flex">
              <div>
                <CDropdown>
                  <CDropdownToggle split={false} color="light">
                    {model}
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => setModel('Linear Regression')}>
                      Linear Regression
                    </CDropdownItem>
                    <CDropdownItem onClick={() => setModel('Logistic Regression')}>
                      Logistic Regression
                    </CDropdownItem>
                    <CDropdownItem onClick={() => setModel('Random Forest')}>
                      Random Forest
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
            </CCardHeader>
            <CCardBody>
              <iframe
                src="./src/assets/loan-app/plotly_graph.html"
                height={1000}
                width={800}
                loading="lazy"
              ></iframe>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Models
