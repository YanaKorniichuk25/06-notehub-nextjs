"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Note } from "@/types/note";
import css from "./NoteForm.module.css";

export interface NoteFormProps {
  onSubmit: (payload: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

export default function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
  const initialValues: FormValues = { title: "", content: "", tag: "" };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    tag: Yup.string().required("Tag is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form className={css.form}>
        <label>
          Title
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" className={css.error} />
        </label>
        <label>
          Content
          <Field as="textarea" name="content" />
          <ErrorMessage name="content" component="div" className={css.error} />
        </label>
        <label>
          Tag
          <Field type="text" name="tag" />
          <ErrorMessage name="tag" component="div" className={css.error} />
        </label>
        <div className={css.buttons}>
          <button type="submit">Add Note</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}
