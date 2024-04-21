import React, { useRef, useState, useEffect } from 'react'
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
  CInputGroupText,
  CFormInput,
  CInputGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CToast,
  CToastBody,
  CToastClose,
  CToastHeader,
  CToaster,
  CTooltip,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  CCloseButton,
  COffcanvasBody,
  CContainer,
  CFooter,
  CForm,
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
  cilPlus,
  cilBook,
  cilFindInPage,
} from '@coreui/icons'
import axios from 'axios'

const Processed = () => {
  const [uploadFile, setUploadFile] = useState(true)
  const [visibleApp, setVisibleApp] = useState(false)
  const [creditPolicy, setCreditPolicy] = useState()
  const [purpose, setPurpose] = useState()
  const [intRate, setIntRate] = useState()
  const [installment, setInstallment] = useState()
  const [logAnnualInc, setLogAnnualInc] = useState()
  const [dti, setDti] = useState()
  const [fico, setFico] = useState()
  const [daysWithCrLine, setDaysWithCrLine] = useState()
  const [revolBal, setRevolBal] = useState()
  const [revolUtil, setRevolUtil] = useState()
  const [inqLast6mths, setInqLast6mths] = useState()
  const [delinq2yrs, setDelinq2yrs] = useState()
  const [pubRec, setPubRec] = useState()
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const [tableData, setTableData] = useState([])
  const [appData, setAppData] = useState({
    id: '',
    credit_policy: '',
    purpose: '',
    int_rate: '',
    installment: '',
    log_annual_inc: '',
    dti: '',
    fico: '',
    days_with_cr_line: '',
    revol_bal: '',
    revol_util: '',
    inq_last_6mths: '',
    delinq_2yrs: '',
    pub_rec: '',
  })
  const [visibleRecheck, setVisibleRecheck] = useState(false)
  const [msgRecheck, setMsgRecheck] = useState('')
  const [idSearch, setIdSearch] = useState('')
  const [searched, setSearched] = useState('')

  const fetchApplication = async () => {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/api/loan_application/history_data')
      .then((res) => {
        setTableData(res.data)
      })
  }

  const sendIdSearch = async () => {
    for (let item of tableData) {
      if (item['id'] == idSearch) {
        setSearched([item])
        return
      }
    }
    // tableData.forEach((item) => {
    //   if (item['id'] == idSearch) {
    //     setSearched([item])
    //     return
    //   }
    // })
    if (idSearch == '') {
      setSearched('')
    } else {
      setSearched('NF')
    }
  }

  useEffect(() => {
    fetchApplication()
  }, [])

  const successToast = (msg) => (
    <CToast title="Success" color="success" className="d-flex">
      <CToastBody>{msg} !</CToastBody>
      <CToastClose className="me-2 m-auto" white />
    </CToast>
  )
  const warningToast = (msg) => (
    <CToast title="Success" color="warning" className="d-flex">
      <CToastBody>{msg} !</CToastBody>
      <CToastClose className="me-2 m-auto" white />
    </CToast>
  )

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-none d-md-flex">
                {'Application'}
                <CForm className="d-flex ms-auto">
                  <CFormInput
                    type="search"
                    className="me-2"
                    placeholder="Search by ID"
                    onChange={(e) => setIdSearch(e.target.value)}
                  />
                  <CButton
                    type="submit"
                    color="success"
                    variant="outline"
                    onClick={() => sendIdSearch()}
                  >
                    Search
                  </CButton>
                </CForm>
              </div>
            </CCardHeader>
            <CCardBody>
              {tableData.length == 0 ? (
                <div>There is nothing to show</div>
              ) : searched == 'NF' ? (
                <div>Not found</div>
              ) : (
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead className="text-nowrap">
                    <CTableRow>
                      <CTableHeaderCell className="bg-body-tertiary text-center">
                        ID
                      </CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">Purpose</CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary ">
                        Credit Policy
                      </CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">Int Rate</CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">Installment</CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">
                        Log Annual Inc
                      </CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">...</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {(searched == '' ? tableData : searched).map((item, index) => (
                      <CTableRow
                        v-for="item in tableItems"
                        key={index}
                        onClick={() => {
                          setAppData(item)
                          setVisibleApp(true)
                        }}
                      >
                        <CTableDataCell className="text-center">
                          {/* <div className="fw-semibold">{item.id.substring(0, 5)}...</div> */}
                          <div>{item.id}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.purpose}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.credit_policy}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.int_rate}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.installment}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.log_annual_inc}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>...</div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CToaster ref={toaster} push={toast} placement="top-end" />

      <COffcanvas placement="end" visible={visibleApp} onHide={() => setVisibleApp(false)}>
        <COffcanvasHeader>
          <COffcanvasTitle>Application Detail</COffcanvasTitle>
          <CCloseButton className="text-reset ms-auto" onClick={() => setVisibleApp(false)} />
        </COffcanvasHeader>
        <COffcanvasBody>
          <CCol>
            <CRow className="mb-2">
              <CCol>
                <CContainer>
                  <CTooltip placement="left" content="abcd">
                    <div> Id </div>
                  </CTooltip>
                </CContainer>
              </CCol>
              <CCol>
                {/* <CRow>{appData['id'].substring(0, 20)}</CRow>
                <CRow>{appData['id'].substring(20)}</CRow> */}
                {appData['id']}
              </CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CContainer>
                  <CTooltip placement="left" content="abcd">
                    <div> Credit Policy </div>
                  </CTooltip>
                </CContainer>
              </CCol>
              <CCol>{appData['credit_policy']}</CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CContainer>
                  <CTooltip placement="left" content="abcd">
                    <div> Purpose </div>
                  </CTooltip>
                </CContainer>
              </CCol>
              <CCol>{appData['purpose']}</CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CContainer>
                  <CTooltip placement="left" content="abcd">
                    <div> Int Rate </div>
                  </CTooltip>
                </CContainer>
              </CCol>
              <CCol>{appData['int_rate']}</CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CContainer>
                  <CTooltip placement="left" content="abcd">
                    <div> Installment </div>
                  </CTooltip>
                </CContainer>
              </CCol>
              <CCol>{appData['installment']}</CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CContainer>
                  <CTooltip placement="left" content="abcd">
                    <div> Log Annual Inc </div>
                  </CTooltip>
                </CContainer>
              </CCol>
              <CCol>{appData['log_annual_inc']}</CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CContainer>
                  <CTooltip placement="left" content="abcd">
                    <div> Dti </div>
                  </CTooltip>
                </CContainer>
              </CCol>
              <CCol>{appData['dti']}</CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CContainer>
                  <CTooltip placement="left" content="abcd">
                    <div> Fico </div>
                  </CTooltip>
                </CContainer>
              </CCol>
              <CCol>{appData['fico']}</CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CContainer>
                  <CTooltip placement="left" content="abcd">
                    <div> Days With Cr Line </div>
                  </CTooltip>
                </CContainer>
              </CCol>
              <CCol>{appData['days_with_cr_line']}</CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CContainer>
                  <CTooltip placement="left" content="abcd">
                    <div> Revol Bal </div>
                  </CTooltip>
                </CContainer>
              </CCol>
              <CCol>{appData['revol_bal']}</CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CContainer>
                  <CTooltip placement="left" content="abcd">
                    <div> Revol Util </div>
                  </CTooltip>
                </CContainer>
              </CCol>
              <CCol>{appData['revol_util']}</CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CContainer>
                  <CTooltip placement="left" content="abcd">
                    <div> Inq Last 6mths </div>
                  </CTooltip>
                </CContainer>
              </CCol>
              <CCol>{appData['inq_last_6mths']}</CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CContainer>
                  <CTooltip placement="left" content="abcd">
                    <div> Delinq 2yrs </div>
                  </CTooltip>
                </CContainer>
              </CCol>
              <CCol>{appData['delinq_2yrs']}</CCol>
            </CRow>
            <CRow className="mb-2">
              <CCol>
                <CContainer>
                  <CTooltip placement="left" content="abcd">
                    <div> Pub Rec </div>
                  </CTooltip>
                </CContainer>
              </CCol>
              <CCol>{appData['pub_rec']}</CCol>
            </CRow>
          </CCol>

          <hr />

          {/* <div className="text-center">Result of Models</div> */}
        </COffcanvasBody>
        <CFooter>
          <div></div>
          <div>
            <CButton
              color="danger"
              className="me-2"
              onClick={() => {
                setVisibleApp(false)
                setMsgRecheck('INSOLVENT')
                setVisibleRecheck(true)
              }}
            >
              Insolvent
            </CButton>
            <CButton
              color="success"
              onClick={() => {
                setVisibleApp(false)
                setMsgRecheck('SOLVENT')
                setVisibleRecheck(true)
              }}
            >
              Solvent
            </CButton>
          </div>
        </CFooter>
      </COffcanvas>
      <CModal
        scrollable
        visible={visibleRecheck}
        backdrop="static"
        onClose={() => setVisibleRecheck(false)}
      >
        <CModalHeader>
          <CModalTitle>Create Application</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <span>Application </span>
          <span className="fw-semibold"> {appData['purpose']} </span>
          <span>is </span>
          <span style={{ color: msgRecheck === 'ACCEPT' ? 'green' : 'red' }}>{msgRecheck}</span>
          <span>?</span>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleRecheck(false)}>
            <div className="ms-1 me-1">No</div>
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              if (msgRecheck == 'ACCEPT') addToast(successToast('Accepted successully'))
              else addToast(warningToast('Rejected successfully'))
              setVisibleRecheck(false)
            }}
          >
            <div className="ms-1 me-1">Yes</div>
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Processed
