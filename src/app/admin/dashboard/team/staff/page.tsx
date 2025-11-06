/**********************************************************************************
 * WICHTIGER HINWEIS (WRITE PROTECT DIRECTIVE)
 * 
 * Diese Datei wurde nach wiederholten Fehlversuchen stabilisiert.
 * ÄNDERN SIE DIESE DATEI UNTER KEINEN UMSTÄNDEN OHNE AUSDRÜCKLICHE ERLAUBNIS.
 * Jede Änderung muss vorher bestätigt werden.
 **********************************************************************************/
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirestore, useCollection, useMemoFirebase, FirebaseClientProvider } from '@/firebase';
import { collection, query, orderBy, writeBatch, serverTimestamp, CollectionReference, DocumentData, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Save, XCircle, AlertCircle, Plus, User, Pencil } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TimedAlert, type TimedAlertProps } from '@/components/ui/timed-alert';

import { StaffCard as DisplayCard } from './_components/staff-card';
import { StaffEditor } from './_components/staff-editor';
import type { StaffMember as CardData } from './_components/staff-editor';
import { LanguageFlags } from '@/components/logos/flags/language-flags';
import { AppSidebar } from '../_components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const initialStaffState: Omit<CardData, 'id' | 'order' | 'createdAt'> = {
    name: "Name",
    role: "Funktion",
    role2: "",
    imageUrl: "",
    backsideContent: "",
    languages: ['de'],
    hidden: false,
    fullWidth: false,
};

function StaffPageContent() {
    const collectionName = "staff";
    const pageTitle = "Praxispersonal verwalten";
    const pageDescription = "Verwalten Sie das auf der Team-Seite angezeigte Praxispersonal.";
    const entityName = "Mitarbeiter";

    const firestore = useFirestore();
    
    const [notification, setNotification]