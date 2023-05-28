import { Card, CardActionArea, CardContent, Grid, alpha, styled } from "@mui/material"


const CardRotationArea = styled(CardActionArea)(({theme}) => ({
    perspective: '20rem',
    ':hover': {
        ':first-child': {
            tranform: 'rotateY(180deg)'
        }
    }

}))

const CardRotationInnerArea = styled('div')(({theme}) => ({
    transition: 'tranform 0.8s',
    transformStyle: 'preserve-3d'
}))

const CardRotationContent = styled(CardContent)(({theme}) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden'
}))

export {
    CardRotationArea,
    CardRotationInnerArea,
    CardRotationContent
}