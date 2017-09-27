import React from 'react';
import { Field } from 'redux-form';
import renderInput from './renderInput';
import FontAwesome from "react-fontawesome";

const renderAliasArray = ({ fields, title, meta: { error, dirty } }) => {

  return (
    <div>
      {fields.map((alias, i) =>
      <div key={i}>
        <Field
          title={title}
          name={alias}
          type="text"
          component={renderInput}
          icon={
            <FontAwesome
              name='times'
              style={{ marginLeft: '7px' }}
              onClick={() => fields.remove(i)}
            />
          }
        />
      </div>
      )}
      <dt></dt>
      <dd>{error && dirty && <span className="alert alert-danger">{error}</span>}</dd>
      <dt></dt>
      <dd>
        <button style={{marginBottom: '7px'}} type="button" onClick={() => fields.push()}>Add Alias</button>
      </dd>
    </div>
  )
}

export default renderAliasArray;
