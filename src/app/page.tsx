'use client';

import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  source: Yup.string()
    .trim()
    .url("Ingresa una URL válida")
    .required("Este campo es obligatorio"),
});

type FormValues = Yup.InferType<typeof validationSchema>;

export default function Home() {
  const toast = useToast();

  const formik = useFormik<FormValues>({
    initialValues: {
      source: "",
    },
    validationSchema,
    onSubmit: (values, actions) => {
      toast({
        title: "Fuente registrada",
        description: `La URL ${values.source} se envió correctamente.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      actions.resetForm();
    },
  });

  return (
    <Container maxW="lg" py={{ base: 12, md: 20 }}>
      <Stack spacing={10}>
        <Stack spacing={3} textAlign="center">
          <Heading size="lg">Registrar fuente de contenido</Heading>
          <Text color="gray.600">
            Comparte la URL en el campo <strong>source</strong> y valida que sea
            correcta antes de continuar.
          </Text>
        </Stack>

        <Stack
          as="form"
          spacing={6}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <FormControl
            isInvalid={Boolean(formik.touched.source && formik.errors.source)}
          >
            <FormLabel htmlFor="source">Source</FormLabel>
            <Input
              id="source"
              name="source"
              placeholder="https://ejemplo.com"
              value={formik.values.source}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormErrorMessage>{formik.errors.source}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            isLoading={formik.isSubmitting}
          >
            Enviar URL
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
