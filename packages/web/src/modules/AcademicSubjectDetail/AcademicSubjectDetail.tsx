import { FC, useMemo } from 'react'

import { Avatar, CardContent, Grid, makeStyles, Stack } from '@material-ui/core'
import { useParams } from 'react-router-dom'

import { DASHBOARD_SPACING } from '@kathena/theme'
import {
  Button,
  InfoBlock,
  PageContainer,
  PageContainerSkeleton,
  SectionCard,
  Typography,
} from '@kathena/ui'
import { useAcademicSubjectDetailQuery } from 'graphql/generated'

export type AcademicSubjectDetailProps = {}

const AcademicSubjectDetail: FC<AcademicSubjectDetailProps> = (props) => {
  const classes = useStyles(props)
  const params: { id: string } = useParams()
  const id = useMemo(() => params.id, [params])
  const { data, loading } = useAcademicSubjectDetailQuery({
    variables: { id },
  })

  const subject = useMemo(() => data?.academicSubject, [data])

  if (loading && !data) {
    return <PageContainerSkeleton maxWidth="md" />
  }

  if (!subject) {
    return (
      <PageContainer maxWidth="md">
        <Typography align="center">
          Môn học không tồn tại học đã bị xoá.
        </Typography>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      withBackButton
      maxWidth="md"
      title={subject.name}
      actions={[<Button variant="contained">Activate</Button>]}
    >
      <Grid container spacing={DASHBOARD_SPACING}>
        <SectionCard
          maxContentHeight={false}
          gridItem={{ xs: 12 }}
          title="Thông tin môn học"
        >
          <CardContent>
            <Grid container>
              <Grid item xs={12} md={5} className={classes.imgSubject}>
                <Avatar variant="rounded" src={subject.imageFileId} />
              </Grid>
              <Grid item xs={12} md={7}>
                <Stack spacing={2}>
                  <InfoBlock label="Mã môn học">{subject.code}</InfoBlock>
                  <InfoBlock label="Tên môn học">{subject.name}</InfoBlock>
                  <InfoBlock label="Mô tả">{subject.description}</InfoBlock>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </SectionCard>
      </Grid>
    </PageContainer>
  )
}

const useStyles = makeStyles(() => ({
  imgSubject: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export default AcademicSubjectDetail
