import React from "react";
import { Formik, Form, Field, useField }  from 'formik'
import { Ethis, Periodicity } from '../../types/Ethis';
import styled from 'styled-components'
import useRequest from "../../utils/hooks/useRequest";

import { PickerInput}  from '../DayPickerInput';




const Container = styled.div`
padding:20px;
border-radius:10px;

`

const Title = styled.div`
padding:20px;
`

const Row =  styled.div`
display:flex;
flex-direction: row;
justify-content:space-between;
`

const Column = styled.div`
display:flex;
flex-direction: column;
`

type Values = {
    name: string;
    description?: string;
    periodicity?: Periodicity;
    deadline?:Date;
    count:number;

  };
export const EthisForm = () => {
  
    const create = useRequest();

    const onSubmit = async (values:Values) => {
       const res = await create('/tasks', values,'POST');
    }
   
    return (
    <Container>
       <Formik
        initialValues={{
        name:'',
        count:1
    }}
    onSubmit={onSubmit}>
        <Form>
        <div>Nom de l'isis</div>
        <Field name="name"/>

        <div>Description</div>
        <Field  name="description" as='textarea'/>
  <Row>
      <Column> 
      <div>Itération</div>
        <Field type="number" name="count"/>
       
        <div>Fréquence</div>
        <Field as="select" name="periodicity" placehoder=''>
            <option value="daily">quotidienne</option>
            <option value="weekly">hebdomadaire</option>
            <option value="monthly">mensuelle</option>
        </Field>
        </Column>
        <Column>
        <div>Date de fin</div>
            <PickerInput name="deadline" />
            </Column>
  </Row>
       
        <button type="submit"> +</button>
       
        </Form>
   
    </Formik>
    </Container>
  );
};

