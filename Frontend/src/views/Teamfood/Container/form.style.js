import { Form } from 'formik'
import styled from 'styled-components'
import { device } from '../../../responsive.breakpoints'

export const FormStyled = styled(Form)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
`