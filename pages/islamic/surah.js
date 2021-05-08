import { makeStyles, Typography } from "@material-ui/core";
import React from "react";``
import {motion} from 'framer-motion'

const UseStyles = makeStyles(()=>({
    root: {
        marginTop: '50px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'center',
        width: '70vw',
        margin: '0 auto',
        flexWrap: 'wrap'
    },
    title: {
        borderTop: 'solid #EDEAF9',
        borderLeft: 'solid #EDEAF9',
        padding: '15px'
    },
    basic: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '300px',
        backgroundColor: '#FCFBFF',
        border: 'solid #EDEAF9',
        padding: '20px',
        borderRadius: '10px'

    }
}))

export default function surah() {
    const classes = UseStyles()
    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <motion.div initial={{y: -500}} animate={{y: 0}} transition={{delay: 0.5}} className={classes.title}>
                    <Typography variant="h3">Surah Al-Hijr</Typography>
                    <Typography variant="h4" >(The Rock)</Typography>
                </motion.div>

                <motion.div initial={{x: 500}} animate={{x: 0}} transition={{delay: 1}} className={classes.basic}>
                    <div>
                        <Typography variant="h5">15</Typography>
                        <Typography variant="subtitle1">Surah</Typography>
                    </div>
                    <div>
                        <Typography variant="h5">99</Typography>
                        <Typography variant="subtitle1">Ayah</Typography>
                    </div>
                    <div>
                        <Typography variant="h5">14</Typography>
                        <Typography variant="subtitle1">Juz</Typography>
                    </div>
                </motion.div>
            </header>
        </div>
    )
}