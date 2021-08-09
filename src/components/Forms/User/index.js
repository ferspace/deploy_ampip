import React from 'react';
import { Grid, TextField } from '@material-ui/core/';
//styles

const styles = {
    formGroup: {
        width:"50%",
        padding: "10px",
    }
}

const UserForm = () => {

    return (
        <>
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <TextField id="filled-basic" label="Nombre" variant="filled"  style={styles.formGroup}/>
                    <TextField id="filled-basic" label="Apellido" variant="filled"  style={styles.formGroup}/>
                </Grid>    
                <Grid item sm={12}>
                    <TextField id="filled-basic" label="Correo" variant="filled"  style={styles.formGroup}/>
                    <TextField id="filled-basic" label="Contraseña" variant="filled"  style={styles.formGroup}/>
                </Grid>             
                
            </Grid>
        </>)

}

export default UserForm;