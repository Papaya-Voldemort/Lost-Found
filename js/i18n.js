const LANGUAGE_STORAGE_KEY = 'language';
const SUPPORTED_LANGUAGES = new Set(['en', 'es', 'fr', 'it', 'zh', 'ar']);

const translations = {
    en: {
        common: {
            brandTagline: 'Making the world a little less lost, one item at a time.',
            copyright: '© 2026 Traceback. All rights reserved.',
            close: 'Close',
            cancel: 'Cancel',
            submit: 'Submit',
            search: 'Search',
            resetFilters: 'Reset Filters',
            loadMore: 'Load More',
            signInNow: 'Sign in Now',
            contactReporter: 'Contact Reporter',
            cropImage: 'Crop Image',
            cropUse: 'Crop & Use',
            photoHint: 'A photo is required to help identify the item. (Max 5 MB)',
            imageRequired: 'An image is required.',
            submitting: 'Submitting...',
            submitFailed: 'Failed to submit item.',
            noItemsFound: 'No items found.',
            itemsLoadFailed: 'Failed to load items. Please try again later.',
            contactUnavailable: 'Contact info not available',
            passwordStrength: ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'],
        },
        nav: {
            home: 'Home',
            lost: 'Lost',
            found: 'Found',
            signIn: 'Sign In',
            account: 'Account',
        },
        home: {
            documentTitle: 'Traceback',
            description: 'Traceback is a website that helps people find lost items.',
            ogTitle: 'Traceback - Find Your Lost Items',
            ogDescription: 'A community-driven platform to report, search, and recover lost items.',
            heroTitle: 'Find Your Lost Items',
            getStarted: 'Get Started',
            introLead: 'A simple app to ',
            typewriterWords: ['search', 'recover', 'report'],
            introTagline: 'No account needed to browse. Post in seconds.',
            feature1: 'Crop & upload photos',
            feature2: 'Search by title, tags & location',
            feature3: 'One-click contact reveal',
            howTitle: 'How It Works',
            howSubtitle: 'Reconnecting you with your belongings in three simple steps.',
            step1Title: 'Report Item',
            step1Body: 'Upload a photo and description of the item you\'ve lost or found. Add tags to help others find it.',
            step2Title: 'Search & Match',
            step2Body: 'Our system cross-references reports to find potential matches nearby. Browse categories to narrow it down.',
            step3Title: 'Safe Return',
            step3Body: 'Coordinate through the platform to verify ownership and arrange a safe meeting spot for the hand-off.',
            stat1: 'Items Reunited',
            stat2: 'Active Users',
            stat3: 'Community Support',
            ctaTitle: 'Ready to reunite with your belongings?',
            ctaBody: 'Join thousands of users helping each other find what matters most.',
            ctaPrimary: 'Create an Account',
            ctaSecondary: 'Browse Lost Items',
        },
        login: {
            documentTitle: 'Sign In - Traceback',
            description: 'Sign in to your Traceback account',
            pageTitle: 'Sign In',
            pageSubtitle: 'Welcome back to Traceback',
            google: 'Sign in with Google',
            or: 'Or',
            emailAddress: 'Email Address',
            password: 'Password',
            passwordPlaceholder: 'Enter your password',
            signIn: 'Sign In',
            signingIn: 'Signing in…',
            forgotPassword: 'Forgot your password?',
            checkInbox: 'Check Your Inbox',
            verificationSentTo: 'We sent a verification email to <strong><span id="verification-email"></span></strong>.',
            verificationInstruction: 'Click the link in the email to activate your account, then come back here and sign in.',
            resendVerificationEmail: 'Resend Verification Email',
            sending: 'Sending…',
            signOutUseDifferent: 'Sign out & use a different account',
            noAccount: 'Don\'t have an account? Sign up',
            resetTitle: 'Reset Password',
            resetBody: 'Enter your email address and we\'ll send you a link to reset your password.',
            sendResetLink: 'Send Reset Link',
            recoverySent: 'Recovery email sent! Check your inbox.',
            recoveryFailedPrefix: 'Failed to send recovery email: ',
            verificationSentToast: 'Verification email sent! Check your inbox.',
            verificationFailedPrefix: 'Failed to send email: ',
            invalidCredentials: 'Invalid credentials. If you registered with Google, please use the \'Sign in with Google\' button.',
            loginFailedPrefix: 'Login failed: ',
            googleFailed: 'Google sign-in failed. Please try again.',
        },
        signup: {
            documentTitle: 'Sign Up - Traceback',
            description: 'Create a Traceback account',
            pageTitle: 'Sign Up',
            pageSubtitle: 'Join the Traceback community',
            google: 'Sign up with Google',
            or: 'Or',
            emailAddress: 'Email Address',
            username: 'Username',
            usernamePlaceholder: '3-20 characters (letters, numbers, _)',
            usernameTitle: 'Username must be 3-20 characters long and can only contain letters, numbers, and underscores.',
            password: 'Password',
            passwordPlaceholder: 'Create a password (min 8 chars)',
            confirmPassword: 'Confirm Password',
            confirmPasswordPlaceholder: 'Confirm your password',
            signUp: 'Sign Up',
            creatingAccount: 'Creating account…',
            alreadyHaveAccount: 'Already have an account? Sign in',
            passwordsMismatch: 'Passwords do not match!',
            invalidUsername: 'Username must be 3-20 characters and contain only letters, numbers, and underscores.',
            accountCreatedVerify: 'Account created! Check your inbox to verify your email.',
            accountCreatedVerifyFailed: 'Account created, but failed to send verification email.',
            signupFailedPrefix: 'Signup failed: ',
        },
        reset: {
            documentTitle: 'Reset Password - Traceback',
            description: 'Reset your Traceback account password',
            pageTitle: 'Reset Password',
            pageSubtitle: 'Enter your new password below',
            newPassword: 'New Password',
            newPasswordPlaceholder: 'At least 8 characters',
            confirmPassword: 'Confirm Password',
            confirmPasswordPlaceholder: 'Confirm new password',
            resetPassword: 'Reset Password',
            resetting: 'Resetting...',
            invalidLink: 'Invalid or expired reset link.',
            passwordsMismatch: 'Passwords do not match.',
            passwordTooShort: 'Password must be at least 8 characters.',
            passwordHasSpaces: 'Password cannot contain spaces.',
            resetSuccess: 'Password reset successfully! Redirecting to login...',
            resetFailedPrefix: 'Failed to reset password: ',
        },
        verify: {
            documentTitle: 'Verify Email - Traceback',
            description: 'Verify your Traceback account email',
            pageTitle: 'Email Verification',
            verifying: 'Verifying your email address...',
            invalidLink: 'Invalid verification link.',
            missingParams: 'Missing verification parameters.',
            success: 'Email verified successfully! Redirecting...',
            successToast: 'Your email has been verified!',
            failed: 'Verification failed.',
            failedPrefix: 'Verification failed: ',
        },
        error: {
            documentTitle: 'Sign In Error - Traceback',
            description: 'Sign in to your Traceback account',
            pageTitle: 'Sign In Error',
            defaultMessage: 'An error occurred during sign-in. Please try again.',
            unexpectedMessage: 'An unexpected error occurred during sign-in.',
            returnToLogin: 'Return to Login',
            googleFailedPrefix: 'Google sign-in failed. ',
        },
        account: {
            documentTitle: 'My Account - Traceback',
            description: 'Manage your Traceback account',
            loadingProfile: 'Loading Profile...',
            pleaseWait: 'please wait',
            checkingStatus: 'Checking status...',
            resendVerificationEmail: 'Resend Verification Email',
            emailSent: 'Email Sent',
            signOut: 'Sign Out',
            settingsTitle: 'Account Settings',
            preferences: 'Preferences',
            language: 'Language',
            preferencesSaved: 'Saved in local storage on this device.',
            appearance: 'Appearance',
            dyslexicFont: 'Dyslexic Font',
            appearanceHelp: 'Uses your device theme unless you choose a specific mode.',
            systemDefault: 'System Default',
            light: 'Light',
            dark: 'Dark',
            updateProfile: 'Update Profile',
            displayName: 'Display Name',
            displayNamePlaceholder: 'Enter new name',
            save: 'Save',
            changePassword: 'Change Password',
            currentPassword: 'Current Password',
            currentPasswordPlaceholder: 'Enter current password',
            newPassword: 'New Password',
            newPasswordPlaceholder: 'At least 8 characters',
            confirmPassword: 'Confirm Password',
            confirmPasswordPlaceholder: 'Confirm new password',
            updatePassword: 'Update Password',
            myListings: 'My Listings',
            reportNewLostItem: 'Report New Lost Item',
            noPosts: 'You haven\'t posted any items yet.',
            loadMore: 'Load More',
            verifiedUser: 'Verified User',
            unverifiedEmail: 'Unverified Email',
            profileUpdated: 'Profile updated successfully',
            profileUpdateFailed: 'Failed to update profile',
            passwordsMismatch: 'Passwords do not match',
            passwordTooShort: 'Password must be at least 8 characters',
            passwordHasSpaces: 'Password cannot contain spaces',
            passwordUpdated: 'Password updated successfully',
            passwordUpdateFailed: 'Failed to update password',
            loggedOut: 'Logged out successfully',
            logoutFailed: 'Failed to logout',
            listingsLoadFailed: 'Failed to load your listings',
            resolve: 'Resolve',
            delete: 'Delete',
            resolveConfirm: 'Mark this item as resolved? It will be removed from the public feed.',
            resolved: 'Item marked as resolved',
            resolveFailed: 'Failed to resolve listing',
            deleteConfirm: 'Are you sure you want to delete this listing? This action cannot be undone.',
            deleted: 'Listing deleted',
            deleteFailed: 'Failed to delete listing',
            verificationSent: 'Verification email sent! Check your inbox.',
            verificationFailed: 'Failed to send verification email',
        },
        lost: {
            documentTitle: 'Lost Items - Traceback',
            description: 'Browse lost items reported by our community',
            pageTitle: 'Lost Items',
            reportTitle: 'Report a Lost Item',
            signInPrompt: 'Sign in to submit lost items.',
            searchTitle: 'Search Lost Items',
            itemName: 'Item Name',
            itemNamePlaceholder: 'e.g. Black North Face Backpack',
            category: 'Category',
            selectCategory: 'Select a Category',
            dateLost: 'Date Lost',
            location: 'Last Seen Location',
            selectLocation: 'Select a Location',
            describeLocation: 'Describe Location',
            describeLocationPlaceholder: 'e.g. Mr. Anderson\'s Room, near the water fountain',
            tags: 'Tags',
            tagsPlaceholder: 'e.g. red, Nike, zipper...',
            addedTags: 'Added tags',
            descriptionLabel: 'Description',
            descriptionPlaceholder: 'Anything else that helps identify it?',
            imageUpload: 'Image Upload',
            signInNow: 'Sign in Now',
            searchItemNamePlaceholder: 'Search by item name...',
            searchTagsPlaceholder: 'Search by tags...',
            locationLost: 'Location Lost',
            searchLocationPlaceholder: 'Location lost...',
            dateFrom: 'Date From',
            dateTo: 'Date To',
            sort: 'Sort',
            oldestFirst: 'Oldest First',
            newestFirst: 'Newest First',
        },
        found: {
            documentTitle: 'Found Items - Traceback',
            description: 'Browse found items reported by our community',
            pageTitle: 'Found Items',
            reportTitle: 'Report a Found Item',
            signInPrompt: 'Sign in to submit found items.',
            searchTitle: 'Search Found Items',
            itemName: 'Item Name',
            itemNamePlaceholder: 'e.g. Black North Face Backpack',
            category: 'Category',
            selectCategory: 'Select a Category',
            dateFound: 'Date Found',
            location: 'Location Found',
            selectLocation: 'Select a Location',
            describeLocation: 'Describe Location',
            describeLocationPlaceholder: 'e.g. Mr. Anderson\'s Room, near the water fountain',
            tags: 'Tags',
            tagsPlaceholder: 'e.g. red, Nike, zipper...',
            addedTags: 'Added tags',
            descriptionLabel: 'Description',
            descriptionPlaceholder: 'Anything else that helps identify it?',
            imageUpload: 'Image Upload',
            signInNow: 'Sign in Now',
            searchItemNamePlaceholder: 'Search by item name...',
            searchTagsPlaceholder: 'Search by tags...',
            locationFound: 'Location Found',
            searchLocationPlaceholder: 'Location found...',
            dateFrom: 'Date From',
            dateTo: 'Date To',
            sort: 'Sort',
            oldestFirst: 'Oldest First',
            newestFirst: 'Newest First',
        },
        forms: {
            categories: {
                electronics: 'Electronics',
                clothing: 'Clothing',
                id: 'ID/Keycard',
                keys: 'Keys',
                bags: 'Backpack/Bags',
                bottle: 'Water Bottle',
                jewelry: 'Jewelry',
                supplies: 'Books/Supplies',
                other: 'Other',
            },
            locations: {
                library: 'Library',
                gym: 'Gym',
                cafeteria: 'Cafeteria',
                hallway: 'Main Hallway',
                classroom: 'Classroom',
                parking: 'Parking Lot',
                bathroom: 'Bathroom',
                office: 'Front Office',
                other: 'Other...',
            },
            removeTag: 'Remove tag {tag}',
            previewUpload: 'Preview of uploaded image',
            imageToCrop: 'Image to crop',
            accountSaved: 'Appearance preference saved',
            languageSaved: 'Language preference saved on this device',
            showPassword: 'Show password',
            hidePassword: 'Hide password',
        }
    },
    es: {
        common: {
            brandTagline: 'Haciendo que el mundo esté un poco menos perdido, un objeto a la vez.',
            copyright: '© 2026 Traceback. Todos los derechos reservados.',
            close: 'Cerrar',
            cancel: 'Cancelar',
            submit: 'Enviar',
            search: 'Buscar',
            resetFilters: 'Restablecer filtros',
            loadMore: 'Cargar más',
            signInNow: 'Inicia sesión ahora',
            contactReporter: 'Contactar al reportero',
            cropImage: 'Recortar imagen',
            cropUse: 'Recortar y usar',
            photoHint: 'Se requiere una foto para ayudar a identificar el objeto. (Máx. 5 MB)',
            imageRequired: 'Se requiere una imagen.',
            submitting: 'Enviando...',
            submitFailed: 'No se pudo enviar el objeto.',
            noItemsFound: 'No se encontraron objetos.',
            itemsLoadFailed: 'No se pudieron cargar los objetos. Inténtalo de nuevo más tarde.',
            contactUnavailable: 'Información de contacto no disponible',
            passwordStrength: ['', 'Débil', 'Regular', 'Buena', 'Fuerte', 'Muy fuerte'],
        },
        nav: { home: 'Inicio', lost: 'Perdidos', found: 'Encontrados', signIn: 'Iniciar sesión', account: 'Cuenta' },
        home: {
            documentTitle: 'Traceback',
            description: 'Traceback es un sitio web que ayuda a las personas a encontrar objetos perdidos.',
            ogTitle: 'Traceback - Encuentra tus objetos perdidos',
            ogDescription: 'Una plataforma impulsada por la comunidad para reportar, buscar y recuperar objetos perdidos.',
            heroTitle: 'Encuentra tus objetos perdidos',
            getStarted: 'Comenzar',
            introLead: 'Una app simple para ',
            typewriterWords: ['buscar', 'recuperar', 'reportar'],
            introTagline: 'No necesitas cuenta para explorar. Publica en segundos.',
            feature1: 'Recorta y sube fotos',
            feature2: 'Busca por título, etiquetas y ubicación',
            feature3: 'Ver contacto con un clic',
            howTitle: 'Cómo funciona',
            howSubtitle: 'Te ayudamos a reencontrarte con tus pertenencias en tres simples pasos.',
            step1Title: 'Reporta el objeto',
            step1Body: 'Sube una foto y una descripción del objeto que perdiste o encontraste. Agrega etiquetas para ayudar a otros a encontrarlo.',
            step2Title: 'Busca y relaciona',
            step2Body: 'Nuestro sistema cruza reportes para encontrar coincidencias cercanas. Explora categorías para acotar resultados.',
            step3Title: 'Devolución segura',
            step3Body: 'Coordina a través de la plataforma para verificar la propiedad y acordar un lugar seguro para la entrega.',
            stat1: 'Objetos reunidos',
            stat2: 'Usuarios activos',
            stat3: 'Apoyo comunitario',
            ctaTitle: '¿Listo para recuperar tus pertenencias?',
            ctaBody: 'Únete a miles de usuarios que se ayudan entre sí a encontrar lo que importa.',
            ctaPrimary: 'Crear una cuenta',
            ctaSecondary: 'Ver objetos perdidos',
        },
        login: {
            documentTitle: 'Iniciar sesión - Traceback',
            description: 'Inicia sesión en tu cuenta de Traceback',
            pageTitle: 'Iniciar sesión',
            pageSubtitle: 'Bienvenido de nuevo a Traceback',
            google: 'Iniciar sesión con Google',
            or: 'O',
            emailAddress: 'Correo electrónico',
            password: 'Contraseña',
            passwordPlaceholder: 'Ingresa tu contraseña',
            signIn: 'Iniciar sesión',
            signingIn: 'Ingresando…',
            forgotPassword: '¿Olvidaste tu contraseña?',
            checkInbox: 'Revisa tu bandeja',
            verificationSentTo: 'Enviamos un correo de verificación a <strong><span id="verification-email"></span></strong>.',
            verificationInstruction: 'Haz clic en el enlace del correo para activar tu cuenta y luego vuelve aquí para iniciar sesión.',
            resendVerificationEmail: 'Reenviar correo de verificación',
            sending: 'Enviando…',
            signOutUseDifferent: 'Cerrar sesión y usar otra cuenta',
            noAccount: '¿No tienes una cuenta? Regístrate',
            resetTitle: 'Restablecer contraseña',
            resetBody: 'Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.',
            sendResetLink: 'Enviar enlace',
            recoverySent: '¡Correo de recuperación enviado! Revisa tu bandeja.',
            recoveryFailedPrefix: 'No se pudo enviar el correo de recuperación: ',
            verificationSentToast: '¡Correo de verificación enviado! Revisa tu bandeja.',
            verificationFailedPrefix: 'No se pudo enviar el correo: ',
            invalidCredentials: 'Credenciales inválidas. Si te registraste con Google, usa el botón "Iniciar sesión con Google".',
            loginFailedPrefix: 'Error de inicio de sesión: ',
            googleFailed: 'Falló el inicio de sesión con Google. Inténtalo de nuevo.',
        },
        signup: {
            documentTitle: 'Registrarse - Traceback',
            description: 'Crea una cuenta de Traceback',
            pageTitle: 'Registrarse',
            pageSubtitle: 'Únete a la comunidad de Traceback',
            google: 'Registrarte con Google',
            or: 'O',
            emailAddress: 'Correo electrónico',
            username: 'Nombre de usuario',
            usernamePlaceholder: '3-20 caracteres (letras, números, _)',
            usernameTitle: 'El nombre de usuario debe tener entre 3 y 20 caracteres y solo puede contener letras, números y guiones bajos.',
            password: 'Contraseña',
            passwordPlaceholder: 'Crea una contraseña (mín. 8 caracteres)',
            confirmPassword: 'Confirmar contraseña',
            confirmPasswordPlaceholder: 'Confirma tu contraseña',
            signUp: 'Registrarse',
            creatingAccount: 'Creando cuenta…',
            alreadyHaveAccount: '¿Ya tienes una cuenta? Inicia sesión',
            passwordsMismatch: '¡Las contraseñas no coinciden!',
            invalidUsername: 'El nombre de usuario debe tener de 3 a 20 caracteres y solo contener letras, números y guiones bajos.',
            accountCreatedVerify: '¡Cuenta creada! Revisa tu bandeja para verificar tu correo.',
            accountCreatedVerifyFailed: 'La cuenta fue creada, pero no se pudo enviar el correo de verificación.',
            signupFailedPrefix: 'Error de registro: ',
        },
        reset: {
            documentTitle: 'Restablecer contraseña - Traceback',
            description: 'Restablece la contraseña de tu cuenta de Traceback',
            pageTitle: 'Restablecer contraseña',
            pageSubtitle: 'Ingresa tu nueva contraseña a continuación',
            newPassword: 'Nueva contraseña',
            newPasswordPlaceholder: 'Al menos 8 caracteres',
            confirmPassword: 'Confirmar contraseña',
            confirmPasswordPlaceholder: 'Confirma la nueva contraseña',
            resetPassword: 'Restablecer contraseña',
            resetting: 'Restableciendo...',
            invalidLink: 'Enlace de restablecimiento inválido o vencido.',
            passwordsMismatch: 'Las contraseñas no coinciden.',
            passwordTooShort: 'La contraseña debe tener al menos 8 caracteres.',
            passwordHasSpaces: 'La contraseña no puede contener espacios.',
            resetSuccess: '¡Contraseña restablecida correctamente! Redirigiendo al inicio de sesión...',
            resetFailedPrefix: 'No se pudo restablecer la contraseña: ',
        },
        verify: {
            documentTitle: 'Verificar correo - Traceback',
            description: 'Verifica el correo de tu cuenta de Traceback',
            pageTitle: 'Verificación de correo',
            verifying: 'Verificando tu correo electrónico...',
            invalidLink: 'Enlace de verificación inválido.',
            missingParams: 'Faltan parámetros de verificación.',
            success: '¡Correo verificado correctamente! Redirigiendo...',
            successToast: '¡Tu correo ha sido verificado!',
            failed: 'La verificación falló.',
            failedPrefix: 'La verificación falló: ',
        },
        error: {
            documentTitle: 'Error de inicio de sesión - Traceback',
            description: 'Inicia sesión en tu cuenta de Traceback',
            pageTitle: 'Error de inicio de sesión',
            defaultMessage: 'Ocurrió un error durante el inicio de sesión. Inténtalo de nuevo.',
            unexpectedMessage: 'Ocurrió un error inesperado durante el inicio de sesión.',
            returnToLogin: 'Volver al inicio de sesión',
            googleFailedPrefix: 'Falló el inicio de sesión con Google. ',
        },
        account: {
            documentTitle: 'Mi cuenta - Traceback',
            description: 'Administra tu cuenta de Traceback',
            loadingProfile: 'Cargando perfil...',
            pleaseWait: 'por favor espera',
            checkingStatus: 'Comprobando estado...',
            resendVerificationEmail: 'Reenviar correo de verificación',
            emailSent: 'Correo enviado',
            signOut: 'Cerrar sesión',
            settingsTitle: 'Configuración de la cuenta',
            preferences: 'Preferencias',
            language: 'Idioma',
            preferencesSaved: 'Guardado en el almacenamiento local de este dispositivo.',
            appearance: 'Apariencia',
            dyslexicFont: 'Fuente Disléxica',
            appearanceHelp: 'Usa el tema de tu dispositivo salvo que elijas un modo específico.',
            systemDefault: 'Predeterminado del sistema',
            light: 'Claro',
            dark: 'Oscuro',
            updateProfile: 'Actualizar perfil',
            displayName: 'Nombre para mostrar',
            displayNamePlaceholder: 'Ingresa un nuevo nombre',
            save: 'Guardar',
            changePassword: 'Cambiar contraseña',
            currentPassword: 'Contraseña actual',
            currentPasswordPlaceholder: 'Ingresa la contraseña actual',
            newPassword: 'Nueva contraseña',
            newPasswordPlaceholder: 'Al menos 8 caracteres',
            confirmPassword: 'Confirmar contraseña',
            confirmPasswordPlaceholder: 'Confirma la nueva contraseña',
            updatePassword: 'Actualizar contraseña',
            myListings: 'Mis publicaciones',
            reportNewLostItem: 'Reportar nuevo objeto perdido',
            noPosts: 'Aún no has publicado ningún objeto.',
            loadMore: 'Cargar más',
            verifiedUser: 'Usuario verificado',
            unverifiedEmail: 'Correo sin verificar',
            profileUpdated: 'Perfil actualizado correctamente',
            profileUpdateFailed: 'No se pudo actualizar el perfil',
            passwordsMismatch: 'Las contraseñas no coinciden',
            passwordTooShort: 'La contraseña debe tener al menos 8 caracteres',
            passwordHasSpaces: 'La contraseña no puede contener espacios',
            passwordUpdated: 'Contraseña actualizada correctamente',
            passwordUpdateFailed: 'No se pudo actualizar la contraseña',
            loggedOut: 'Sesión cerrada correctamente',
            logoutFailed: 'No se pudo cerrar la sesión',
            listingsLoadFailed: 'No se pudieron cargar tus publicaciones',
            resolve: 'Resolver',
            delete: 'Eliminar',
            resolveConfirm: '¿Marcar este objeto como resuelto? Se eliminará del feed público.',
            resolved: 'Objeto marcado como resuelto',
            resolveFailed: 'No se pudo resolver la publicación',
            deleteConfirm: '¿Seguro que quieres eliminar esta publicación? Esta acción no se puede deshacer.',
            deleted: 'Publicación eliminada',
            deleteFailed: 'No se pudo eliminar la publicación',
            verificationSent: '¡Correo de verificación enviado! Revisa tu bandeja.',
            verificationFailed: 'No se pudo enviar el correo de verificación',
        },
        lost: {
            documentTitle: 'Objetos perdidos - Traceback',
            description: 'Explora los objetos perdidos reportados por nuestra comunidad',
            pageTitle: 'Objetos perdidos',
            reportTitle: 'Reportar un objeto perdido',
            signInPrompt: 'Inicia sesión para enviar objetos perdidos.',
            searchTitle: 'Buscar objetos perdidos',
            itemName: 'Nombre del objeto',
            itemNamePlaceholder: 'ej. Mochila negra North Face',
            category: 'Categoría',
            selectCategory: 'Selecciona una categoría',
            dateLost: 'Fecha de pérdida',
            location: 'Última ubicación conocida',
            selectLocation: 'Selecciona una ubicación',
            describeLocation: 'Describe la ubicación',
            describeLocationPlaceholder: 'ej. Aula del profesor Anderson, cerca de la fuente',
            tags: 'Etiquetas',
            tagsPlaceholder: 'ej. rojo, Nike, cremallera...',
            addedTags: 'Etiquetas agregadas',
            descriptionLabel: 'Descripción',
            descriptionPlaceholder: '¿Algo más que ayude a identificarlo?',
            imageUpload: 'Subir imagen',
            signInNow: 'Inicia sesión ahora',
            searchItemNamePlaceholder: 'Buscar por nombre del objeto...',
            searchTagsPlaceholder: 'Buscar por etiquetas...',
            locationLost: 'Lugar donde se perdió',
            searchLocationPlaceholder: 'Lugar de pérdida...',
            dateFrom: 'Fecha desde',
            dateTo: 'Fecha hasta',
            sort: 'Ordenar',
            oldestFirst: 'Más antiguos primero',
            newestFirst: 'Más recientes primero',
        },
        found: {
            documentTitle: 'Objetos encontrados - Traceback',
            description: 'Explora los objetos encontrados reportados por nuestra comunidad',
            pageTitle: 'Objetos encontrados',
            reportTitle: 'Reportar un objeto encontrado',
            signInPrompt: 'Inicia sesión para enviar objetos encontrados.',
            searchTitle: 'Buscar objetos encontrados',
            itemName: 'Nombre del objeto',
            itemNamePlaceholder: 'ej. Mochila negra North Face',
            category: 'Categoría',
            selectCategory: 'Selecciona una categoría',
            dateFound: 'Fecha de hallazgo',
            location: 'Lugar donde se encontró',
            selectLocation: 'Selecciona una ubicación',
            describeLocation: 'Describe la ubicación',
            describeLocationPlaceholder: 'ej. Aula del profesor Anderson, cerca de la fuente',
            tags: 'Etiquetas',
            tagsPlaceholder: 'ej. rojo, Nike, cremallera...',
            addedTags: 'Etiquetas agregadas',
            descriptionLabel: 'Descripción',
            descriptionPlaceholder: '¿Algo más que ayude a identificarlo?',
            imageUpload: 'Subir imagen',
            signInNow: 'Inicia sesión ahora',
            searchItemNamePlaceholder: 'Buscar por nombre del objeto...',
            searchTagsPlaceholder: 'Buscar por etiquetas...',
            locationFound: 'Lugar donde se encontró',
            searchLocationPlaceholder: 'Lugar de hallazgo...',
            dateFrom: 'Fecha desde',
            dateTo: 'Fecha hasta',
            sort: 'Ordenar',
            oldestFirst: 'Más antiguos primero',
            newestFirst: 'Más recientes primero',
        },
        forms: {
            categories: { electronics: 'Electrónica', clothing: 'Ropa', id: 'ID/Tarjeta', keys: 'Llaves', bags: 'Mochilas/Bolsos', bottle: 'Botella de agua', jewelry: 'Joyería', supplies: 'Libros/Útiles', other: 'Otro' },
            locations: { library: 'Biblioteca', gym: 'Gimnasio', cafeteria: 'Cafetería', hallway: 'Pasillo principal', classroom: 'Aula', parking: 'Estacionamiento', bathroom: 'Baño', office: 'Oficina principal', other: 'Otro...' },
            removeTag: 'Quitar etiqueta {tag}',
            previewUpload: 'Vista previa de la imagen subida',
            imageToCrop: 'Imagen para recortar',
            accountSaved: 'Preferencia de apariencia guardada',
            languageSaved: 'Preferencia de idioma guardada en este dispositivo',
            showPassword: 'Mostrar contraseña',
            hidePassword: 'Ocultar contraseña',
        }
    },
    fr: {
      common: {
        brandTagline: 'Rendre le monde un peu moins perdu, un élément à la fois.',
        copyright: '© 2026 Traceback. Tous droits réservés.',
        close: 'Fermer',
        cancel: 'Annuler',
        submit: 'Envoyer',
        search: 'Rechercher',
        resetFilters: 'Réinitialiser les filtres',
        loadMore: 'Charger plus',
        signInNow: 'Connectez-vous maintenant',
        contactReporter: 'Contacter le déclarant',
        cropImage: "Recadrer l'image",
        cropUse: 'Recadrage et utilisation',
        photoHint: "Une photo est requise pour aider à identifier l'article. (Max 5 Mo)",
        imageRequired: 'Une image est requise.',
        submitting: 'Soumission...',
        submitFailed: "Échec de la soumission de l'élément.",
        noItemsFound: 'Aucun élément trouvé.',
        itemsLoadFailed: 'Échec du chargement des éléments. Veuillez réessayer plus tard.',
        contactUnavailable: 'Coordonnées non disponibles',
        passwordStrength: [
          '',
          'Faible',
          'Équitable',
          'Bien',
          'Fort',
          'Très fort'
        ]
      },
      nav: {
        home: 'Accueil',
        lost: 'Perdus',
        found: 'Trouvés',
        signIn: 'Se connecter',
        account: 'Compte'
      },
      home: {
        documentTitle: 'Traceback',
        description: 'Traceback est un site Web qui aide les gens à retrouver des objets perdus.',
        ogTitle: 'Traceback - Trouvez vos objets perdus',
        ogDescription: 'Une plateforme communautaire pour signaler, rechercher et récupérer les objets perdus.',
        heroTitle: 'Trouvez vos objets perdus',
        getStarted: 'Commencer',
        introLead: 'Une application simple pour ',
        typewriterWords: [
          'rechercher',
          'retrouver',
          'signaler'
        ],
        introTagline: "Aucun compte n'est nécessaire pour naviguer. Publiez en quelques secondes.",
        feature1: 'Recadrer et télécharger des photos',
        feature2: 'Rechercher par titre, tags et emplacement',
        feature3: 'Révélation des contacts en un clic',
        howTitle: 'Comment ça marche',
        howSubtitle: 'Vous reconnecter avec vos affaires en trois étapes simples.',
        step1Title: 'Signaler un objet',
        step1Body: "Téléchargez une photo et une description de l'objet que vous avez perdu ou trouvé. Ajoutez des balises pour aider les autres à le trouver.",
        step2Title: 'Rechercher et faire correspondre',
        step2Body: 'Notre système croise les rapports pour trouver des correspondances potentielles à proximité. Parcourez les catégories pour les affiner.',
        step3Title: 'Retour en toute sécurité',
        step3Body: 'Coordonnez-vous via la plateforme pour vérifier la propriété et organiser un lieu de rendez-vous sûr pour le transfert.',
        stat1: 'Objets réunis',
        stat2: 'Utilisateurs actifs',
        stat3: 'Soutien communautaire',
        ctaTitle: 'Prêt à retrouver vos affaires ?',
        ctaBody: "Rejoignez des milliers d'utilisateurs qui s'entraident pour trouver ce qui compte le plus.",
        ctaPrimary: 'Créer un compte',
        ctaSecondary: 'Parcourir les objets perdus'
      },
      login: {
        documentTitle: 'Connexion - Traceback',
        description: 'Connectez-vous à votre compte Traceback',
        pageTitle: 'Se connecter',
        pageSubtitle: 'Bienvenue sur Traceback',
        google: 'Connectez-vous avec Google',
        or: 'Ou',
        emailAddress: 'Adresse email',
        password: 'Mot de passe',
        passwordPlaceholder: 'Entrez votre mot de passe',
        signIn: 'Se connecter',
        signingIn: 'Connexion…',
        forgotPassword: 'Vous avez oublié votre mot de passe ?',
        checkInbox: 'Vérifiez votre boîte de réception',
        verificationSentTo: 'Nous avons envoyé un e-mail de vérification à <strong><span id="verification-email"></span></strong>.',
        verificationInstruction: "Cliquez sur le lien dans l'e-mail pour activer votre compte, puis revenez ici et connectez-vous.",
        resendVerificationEmail: "Renvoyer l'e-mail de vérification",
        sending: 'Envoi…',
        signOutUseDifferent: 'Déconnectez-vous et utilisez un autre compte',
        noAccount: "Vous n'avez pas de compte ? S'inscrire",
        resetTitle: 'Réinitialiser le mot de passe',
        resetBody: 'Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.',
        sendResetLink: 'Envoyer le lien de réinitialisation',
        recoverySent: 'E-mail de récupération envoyé ! Vérifiez votre boîte de réception.',
        recoveryFailedPrefix: "Échec de l'envoi de l'e-mail de récupération : ",
        verificationSentToast: 'E-mail de vérification envoyé ! Vérifiez votre boîte de réception.',
        verificationFailedPrefix: "Échec de l'envoi de l'e-mail : ",
        invalidCredentials: 'Identifiants invalides. Si vous êtes inscrit auprès de Google, veuillez utiliser le bouton « Connexion avec Google ».',
        loginFailedPrefix: 'Échec de la connexion : ',
        googleFailed: 'La connexion à Google a échoué. Veuillez réessayer.'
      },
      signup: {
        documentTitle: 'Inscription - Traceback',
        description: 'Créer un compte Traceback',
        pageTitle: "S'inscrire",
        pageSubtitle: 'Rejoignez la communauté Traceback',
        google: 'Inscrivez-vous avec Google',
        or: 'Ou',
        emailAddress: 'Adresse email',
        username: "Nom d'utilisateur",
        usernamePlaceholder: '3 à 20 caractères (lettres, chiffres, _)',
        usernameTitle: 'Le nom d’utilisateur doit comporter entre 3 et 20 caractères et ne peut contenir que des lettres, des chiffres et des traits de soulignement.',
        password: 'Mot de passe',
        passwordPlaceholder: 'Créez un mot de passe (min 8 caractères)',
        confirmPassword: 'Confirmez le mot de passe',
        confirmPasswordPlaceholder: 'Confirmez votre mot de passe',
        signUp: "S'inscrire",
        creatingAccount: "Création d'un compte…",
        alreadyHaveAccount: 'Vous avez déjà un compte ? Se connecter',
        passwordsMismatch: 'Les mots de passe ne correspondent pas !',
        invalidUsername: 'Le nom d’utilisateur doit comporter entre 3 et 20 caractères et contenir uniquement des lettres, des chiffres et des traits de soulignement.',
        accountCreatedVerify: 'Compte créé ! Vérifiez votre boîte de réception pour vérifier votre e-mail.',
        accountCreatedVerifyFailed: "Compte créé, mais n'a pas réussi à envoyer l'e-mail de vérification.",
        signupFailedPrefix: "Échec de l'inscription : "
      },
      reset: {
        documentTitle: 'Réinitialiser le mot de passe - Traceback',
        description: 'Réinitialisez le mot de passe de votre compte Traceback',
        pageTitle: 'Réinitialiser le mot de passe',
        pageSubtitle: 'Entrez votre nouveau mot de passe ci-dessous',
        newPassword: 'Nouveau mot de passe',
        newPasswordPlaceholder: 'Au moins 8 caractères',
        confirmPassword: 'Confirmez le mot de passe',
        confirmPasswordPlaceholder: 'Confirmer le nouveau mot de passe',
        resetPassword: 'Réinitialiser le mot de passe',
        resetting: 'Réinitialisation...',
        invalidLink: 'Lien de réinitialisation invalide ou expiré.',
        passwordsMismatch: 'Les mots de passe ne correspondent pas.',
        passwordTooShort: 'Le mot de passe doit comporter au moins 8 caractères.',
        passwordHasSpaces: "Le mot de passe ne peut pas contenir d'espaces.",
        resetSuccess: 'Réinitialisation du mot de passe réussie ! Redirection vers la connexion...',
        resetFailedPrefix: 'Échec de la réinitialisation du mot de passe : '
      },
      verify: {
        documentTitle: "Vérifier l'e-mail - Traceback",
        description: "Vérifiez l'e-mail de votre compte Traceback",
        pageTitle: 'Vérification par e-mail',
        verifying: 'Vérification de votre adresse e-mail...',
        invalidLink: 'Lien de vérification invalide.',
        missingParams: 'Paramètres de vérification manquants.',
        success: 'E-mail vérifié avec succès ! Redirection...',
        successToast: 'Votre email a été vérifié!',
        failed: 'La vérification a échoué.',
        failedPrefix: 'Échec de la vérification : '
      },
      error: {
        documentTitle: 'Erreur de connexion - Traceback',
        description: 'Connectez-vous à votre compte Traceback',
        pageTitle: 'Erreur de connexion',
        defaultMessage: "Une erreur s'est produite lors de la connexion. Veuillez réessayer.",
        unexpectedMessage: "Une erreur inattendue s'est produite lors de la connexion.",
        returnToLogin: 'Revenir à la connexion',
        googleFailedPrefix: 'La connexion à Google a échoué.'
      },
      account: {
        documentTitle: 'Mon compte - Traceback',
        description: 'Gérez votre compte Traceback',
        loadingProfile: 'Chargement du profil...',
        pleaseWait: "S'il vous plaît, attendez",
        checkingStatus: "Vérification de l'état...",
        resendVerificationEmail: "Renvoyer l'e-mail de vérification",
        emailSent: 'E-mail envoyé',
        signOut: 'Se déconnecter',
        settingsTitle: 'Paramètres du compte',
        preferences: 'Préférences',
        language: 'Langue',
        preferencesSaved: 'Enregistré dans le stockage local sur cet appareil.',
        appearance: 'Apparence',
        dyslexicFont: 'Police dyslexique',
        appearanceHelp: 'Utilise le thème de votre appareil, sauf si vous choisissez un mode spécifique.',
        systemDefault: 'Système par défaut',
        light: 'Clair',
        dark: 'Sombre',
        updateProfile: 'Mettre à jour le profil',
        displayName: "Nom d'affichage",
        displayNamePlaceholder: 'Entrez un nouveau nom',
        save: 'Sauvegarder',
        changePassword: 'Changer le mot de passe',
        currentPassword: 'Mot de passe actuel',
        currentPasswordPlaceholder: 'Entrez le mot de passe actuel',
        newPassword: 'Nouveau mot de passe',
        newPasswordPlaceholder: 'Au moins 8 caractères',
        confirmPassword: 'Confirmez le mot de passe',
        confirmPasswordPlaceholder: 'Confirmer le nouveau mot de passe',
        updatePassword: 'Mettre à jour le mot de passe',
        myListings: 'Mes annonces',
        reportNewLostItem: 'Signaler un nouvel objet perdu',
        noPosts: "Vous n'avez encore publié aucun élément.",
        loadMore: 'Charger plus',
        verifiedUser: 'Utilisateur vérifié',
        unverifiedEmail: 'E-mail non vérifié',
        profileUpdated: 'Profil mis à jour avec succès',
        profileUpdateFailed: 'Échec de la mise à jour du profil',
        passwordsMismatch: 'Les mots de passe ne correspondent pas',
        passwordTooShort: 'Le mot de passe doit contenir au moins 8 caractères',
        passwordHasSpaces: "Le mot de passe ne peut pas contenir d'espaces",
        passwordUpdated: 'Mot de passe mis à jour avec succès',
        passwordUpdateFailed: 'Échec de la mise à jour du mot de passe',
        loggedOut: 'Déconnecté avec succès',
        logoutFailed: 'Échec de la déconnexion',
        listingsLoadFailed: 'Échec du chargement de vos annonces',
        resolve: 'Résoudre',
        delete: 'Supprimer',
        resolveConfirm: 'Marquer cet élément comme résolu ? Il sera supprimé du flux public.',
        resolved: 'Élément marqué comme résolu',
        resolveFailed: 'Échec de la résolution de la fiche',
        deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action ne peut pas être annulée.',
        deleted: 'Annonce supprimée',
        deleteFailed: 'Échec de la suppression de la fiche',
        verificationSent: 'E-mail de vérification envoyé ! Vérifiez votre boîte de réception.',
        verificationFailed: "Échec de l'envoi de l'e-mail de vérification"
      },
      lost: {
        documentTitle: 'Objets perdus - Traceback',
        description: 'Parcourez les objets perdus signalés par notre communauté',
        pageTitle: 'Objets perdus',
        reportTitle: 'Signaler un objet perdu',
        signInPrompt: 'Connectez-vous pour soumettre les objets perdus.',
        searchTitle: 'Rechercher des objets perdus',
        itemName: "Nom de l'article",
        itemNamePlaceholder: 'par ex. Sac à dos North Face noir',
        category: 'Catégorie',
        selectCategory: 'Sélectionnez une catégorie',
        dateLost: 'Date de perte',
        location: 'Emplacement vu pour la dernière fois',
        selectLocation: 'Sélectionnez un emplacement',
        describeLocation: "Décrire l'emplacement",
        describeLocationPlaceholder: 'par ex. Chambre de M. Anderson, près de la fontaine à eau',
        tags: 'Balises',
        tagsPlaceholder: 'par ex. rouge, Nike, fermeture éclair...',
        addedTags: 'Balises ajoutées',
        descriptionLabel: 'Description',
        descriptionPlaceholder: "Y a-t-il autre chose qui aide à l'identifier ?",
        imageUpload: "Téléchargement d'images",
        signInNow: 'Connectez-vous maintenant',
        searchItemNamePlaceholder: "Rechercher par nom d'article...",
        searchTagsPlaceholder: 'Recherche par balises...',
        locationLost: 'Emplacement perdu',
        searchLocationPlaceholder: 'Localisation perdue....',
        dateFrom: 'Date de début',
        dateTo: 'Date de fin',
        sort: 'Trier',
        oldestFirst: 'Le plus âgé en premier',
        newestFirst: 'Le plus récent en premier'
      },
      found: {
        documentTitle: 'Objets trouvés - Traceback',
        description: 'Parcourir les éléments trouvés signalés par notre communauté',
        pageTitle: 'Objets trouvés',
        reportTitle: 'Signaler un article trouvé',
        signInPrompt: 'Connectez-vous pour soumettre les éléments trouvés.',
        searchTitle: 'Rechercher les éléments trouvés',
        itemName: "Nom de l'article",
        itemNamePlaceholder: 'par ex. Sac à dos North Face noir',
        category: 'Catégorie',
        selectCategory: 'Sélectionnez une catégorie',
        dateFound: 'Date de découverte',
        location: 'Emplacement trouvé',
        selectLocation: 'Sélectionnez un emplacement',
        describeLocation: "Décrire l'emplacement",
        describeLocationPlaceholder: 'par ex. Chambre de M. Anderson, près de la fontaine à eau',
        tags: 'Balises',
        tagsPlaceholder: 'par ex. rouge, Nike, fermeture éclair...',
        addedTags: 'Balises ajoutées',
        descriptionLabel: 'Description',
        descriptionPlaceholder: "Y a-t-il autre chose qui aide à l'identifier ?",
        imageUpload: "Téléchargement d'images",
        signInNow: 'Connectez-vous maintenant',
        searchItemNamePlaceholder: "Rechercher par nom d'article...",
        searchTagsPlaceholder: 'Recherche par balises...',
        locationFound: 'Emplacement trouvé',
        searchLocationPlaceholder: 'Localisation trouvée...',
        dateFrom: 'Date de début',
        dateTo: 'Date de fin',
        sort: 'Trier',
        oldestFirst: 'Le plus âgé en premier',
        newestFirst: 'Le plus récent en premier'
      },
      forms: {
        categories: {
          electronics: 'Électronique',
          clothing: 'Vêtements',
          id: "Carte d'identité/carte d'accès",
          keys: 'Clés',
          bags: 'Sac à dos/sacs',
          bottle: "Bouteille d'eau",
          jewelry: 'Bijoux',
          supplies: 'Livres/Fournitures',
          other: 'Autre'
        },
        locations: {
          library: 'Bibliothèque',
          gym: 'Salle de sport',
          cafeteria: 'Cafétéria',
          hallway: 'Couloir principal',
          classroom: 'Classe',
          parking: 'Parking',
          bathroom: 'Salle de bain',
          office: 'Réception',
          other: 'Autre...'
        },
        removeTag: 'Supprimer le tag {tag}',
        previewUpload: "Aperçu de l'image téléchargée",
        imageToCrop: 'Image à recadrer',
        accountSaved: "Préférence d'apparence enregistrée",
        languageSaved: 'Préférence de langue enregistrée sur cet appareil',
        showPassword: 'Afficher le mot de passe',
        hidePassword: 'Masquer le mot de passe'
      }
    },
    it: {
      common: {
        brandTagline: "Rendere il mondo un po' meno perduto, un elemento alla volta.",
        copyright: '© 2026 Traceback. Tutti i diritti riservati.',
        close: 'Chiudi',
        cancel: 'Annulla',
        submit: 'Invia',
        search: 'Cerca',
        resetFilters: 'Reimposta filtri',
        loadMore: 'Carica altro',
        signInNow: 'Accedi ora',
        contactReporter: 'Contatta il segnalatore',
        cropImage: 'Ritaglia immagine',
        cropUse: 'Ritaglia e usa',
        photoHint: "È necessaria una foto per identificare l'oggetto. (Massimo 5MB)",
        imageRequired: "È richiesta un'immagine.",
        submitting: 'Invio...',
        submitFailed: "Impossibile inviare l'articolo.",
        noItemsFound: 'Nessun articolo trovato.',
        itemsLoadFailed: 'Impossibile caricare gli oggetti. Riprova più tardi.',
        contactUnavailable: 'Informazioni di contatto non disponibili',
        passwordStrength: [
          '',
          'Debole',
          'Giusto',
          'Bene',
          'Forte',
          'Molto forte'
        ]
      },
      nav: {
        home: 'Home',
        lost: 'Smarriti',
        found: 'Trovati',
        signIn: 'Accedi',
        account: 'Account'
      },
      home: {
        documentTitle: 'Traceback',
        description: 'Traceback è un sito Web che aiuta le persone a trovare oggetti smarriti.',
        ogTitle: 'Traceback: trova i tuoi oggetti smarriti',
        ogDescription: 'Una piattaforma guidata dalla comunità per segnalare, cercare e recuperare oggetti smarriti.',
        heroTitle: 'Trova i tuoi oggetti smarriti',
        getStarted: 'Inizia',
        introLead: "Un'app semplice per ",
        typewriterWords: [
          'cercare',
          'recuperare',
          'segnalare'
        ],
        introTagline: 'Nessun account necessario per navigare. Pubblica in pochi secondi.',
        feature1: 'Ritaglia e carica foto',
        feature2: 'Cerca per titolo, tag e posizione',
        feature3: 'Rivelazione dei contatti con un clic',
        howTitle: 'Come funziona',
        howSubtitle: 'Riconnetterti con le tue cose in tre semplici passaggi.',
        step1Title: 'Segnala elemento',
        step1Body: "Carica una foto e una descrizione dell'oggetto che hai perso o ritrovato. Aggiungi tag per aiutare gli altri a trovarlo.",
        step2Title: 'Cerca e abbina',
        step2Body: 'Il nostro sistema fa riferimenti incrociati ai rapporti per trovare potenziali corrispondenze nelle vicinanze. Sfoglia le categorie per restringere il campo.',
        step3Title: 'Ritorno sicuro',
        step3Body: 'Coordinarsi attraverso la piattaforma per verificare la proprietà e organizzare un luogo di incontro sicuro per il trasferimento.',
        stat1: 'Elementi riuniti',
        stat2: 'Utenti attivi',
        stat3: 'Supporto comunitario',
        ctaTitle: 'Pronto a riunirti con le tue cose?',
        ctaBody: 'Unisciti a migliaia di utenti che si aiutano a vicenda per trovare ciò che conta di più.',
        ctaPrimary: 'Creare un account',
        ctaSecondary: 'Sfoglia gli oggetti smarriti'
      },
      login: {
        documentTitle: 'Accedi - Traceback',
        description: 'Accedi al tuo account Traceback',
        pageTitle: 'Accedi',
        pageSubtitle: 'Bentornati a Traceback',
        google: 'Accedi con Google',
        or: 'O',
        emailAddress: 'Indirizzo e-mail',
        password: 'Password',
        passwordPlaceholder: 'Inserisci la tua password',
        signIn: 'Accedi',
        signingIn: 'Accesso in corso…',
        forgotPassword: 'Hai dimenticato la password?',
        checkInbox: 'Controlla la tua casella di posta',
        verificationSentTo: `Abbiamo inviato un'email di verifica a <strong><span id="verification-email"></span></strong>.`,
        verificationInstruction: "Fai clic sul collegamento nell'e-mail per attivare il tuo account, quindi torna qui e accedi.",
        resendVerificationEmail: "Invia nuovamente l'e-mail di verifica",
        sending: 'Invio…',
        signOutUseDifferent: 'Esci e utilizza un account diverso',
        noAccount: 'Non hai un account? Registrati',
        resetTitle: 'Reimposta password',
        resetBody: 'Inserisci il tuo indirizzo email e ti invieremo un collegamento per reimpostare la password.',
        sendResetLink: 'Invia collegamento di reimpostazione',
        recoverySent: 'Email di recupero inviata! Controlla la tua casella di posta.',
        recoveryFailedPrefix: "Impossibile inviare l'e-mail di recupero: ",
        verificationSentToast: 'Email di verifica inviata! Controlla la tua casella di posta.',
        verificationFailedPrefix: "Impossibile inviare l'e-mail: ",
        invalidCredentials: 'Credenziali non valide. Se ti sei registrato con Google, utilizza il pulsante "Accedi con Google".',
        loginFailedPrefix: 'Accesso non riuscito: ',
        googleFailed: 'Accesso a Google non riuscito. Per favore riprova.'
      },
      signup: {
        documentTitle: 'Iscriviti - Traceback',
        description: 'Crea un account Traceback',
        pageTitle: 'Registrati',
        pageSubtitle: 'Unisciti alla comunità di Traceback',
        google: 'Iscriviti con Google',
        or: 'O',
        emailAddress: 'Indirizzo e-mail',
        username: 'Nome utente',
        usernamePlaceholder: '3-20 caratteri (lettere, numeri, _)',
        usernameTitle: 'Il nome utente deve contenere da 3 a 20 caratteri e può contenere solo lettere, numeri e trattini bassi.',
        password: 'Password',
        passwordPlaceholder: 'Crea una password (minimo 8 caratteri)',
        confirmPassword: 'Conferma password',
        confirmPasswordPlaceholder: 'Conferma la tua password',
        signUp: 'Registrati',
        creatingAccount: "Creazione dell'account...",
        alreadyHaveAccount: 'Hai già un account? Accedi',
        passwordsMismatch: 'Le password non corrispondono!',
        invalidUsername: 'Il nome utente deve contenere da 3 a 20 caratteri e contenere solo lettere, numeri e trattini bassi.',
        accountCreatedVerify: 'Account creato! Controlla la tua casella di posta per verificare la tua email.',
        accountCreatedVerifyFailed: "Account creato, ma impossibile inviare l'e-mail di verifica.",
        signupFailedPrefix: 'Registrazione non riuscita: '
      },
      reset: {
        documentTitle: 'Reimposta password - Traceback',
        description: 'Reimposta la password del tuo account Traceback',
        pageTitle: 'Reimposta password',
        pageSubtitle: 'Inserisci la tua nuova password qui sotto',
        newPassword: 'Nuova password',
        newPasswordPlaceholder: 'Almeno 8 caratteri',
        confirmPassword: 'Conferma password',
        confirmPasswordPlaceholder: 'Conferma la nuova password',
        resetPassword: 'Reimposta password',
        resetting: 'Reimpostazione...',
        invalidLink: 'Collegamento di ripristino non valido o scaduto.',
        passwordsMismatch: 'Le password non corrispondono.',
        passwordTooShort: 'La password deve contenere almeno 8 caratteri.',
        passwordHasSpaces: 'La password non può contenere spazi.',
        resetSuccess: "Reimpostazione della password riuscita! Reindirizzamento all'accesso...",
        resetFailedPrefix: 'Impossibile reimpostare la password: '
      },
      verify: {
        documentTitle: 'Verifica e-mail - Traceback',
        description: "Verifica l'e-mail del tuo account Traceback",
        pageTitle: 'Verifica e-mail',
        verifying: 'Verifica del tuo indirizzo email...',
        invalidLink: 'Collegamento di verifica non valido.',
        missingParams: 'Parametri di verifica mancanti.',
        success: 'Email verificata con successo! Reindirizzamento...',
        successToast: 'La tua email è stata verificata!',
        failed: 'Verifica non riuscita.',
        failedPrefix: 'Verifica non riuscita: '
      },
      error: {
        documentTitle: 'Errore di accesso - Traceback',
        description: 'Accedi al tuo account Traceback',
        pageTitle: 'Errore di accesso',
        defaultMessage: "Si è verificato un errore durante l'accesso. Per favore riprova.",
        unexpectedMessage: "Si è verificato un errore imprevisto durante l'accesso.",
        returnToLogin: "Torna all'accesso",
        googleFailedPrefix: 'Accesso a Google non riuscito.'
      },
      account: {
        documentTitle: 'Il mio account - Traceback',
        description: 'Gestisci il tuo account Traceback',
        loadingProfile: 'Caricamento profilo...',
        pleaseWait: 'attendere prego',
        checkingStatus: 'Verifica dello stato...',
        resendVerificationEmail: "Invia nuovamente l'e-mail di verifica",
        emailSent: 'E-mail inviata',
        signOut: 'Esci',
        settingsTitle: "Impostazioni dell'account",
        preferences: 'Preferenze',
        language: 'Lingua',
        preferencesSaved: 'Salvato nella memoria locale su questo dispositivo.',
        appearance: 'Aspetto',
        dyslexicFont: 'Carattere dislessico',
        appearanceHelp: 'Utilizza il tema del tuo dispositivo a meno che tu non scelga una modalità specifica.',
        systemDefault: 'Predefinito del sistema',
        light: 'Chiaro',
        dark: 'Scuro',
        updateProfile: 'Aggiorna profilo',
        displayName: 'Nome da visualizzare',
        displayNamePlaceholder: 'Inserisci il nuovo nome',
        save: 'Salva',
        changePassword: 'Cambia password',
        currentPassword: 'Password attuale',
        currentPasswordPlaceholder: 'Inserisci la password attuale',
        newPassword: 'Nuova password',
        newPasswordPlaceholder: 'Almeno 8 caratteri',
        confirmPassword: 'Conferma password',
        confirmPasswordPlaceholder: 'Conferma la nuova password',
        updatePassword: 'Aggiorna password',
        myListings: 'I miei annunci',
        reportNewLostItem: 'Segnala un nuovo oggetto smarrito',
        noPosts: 'Non hai ancora pubblicato alcun articolo.',
        loadMore: 'Carica altro',
        verifiedUser: 'Utente verificato',
        unverifiedEmail: 'E-mail non verificata',
        profileUpdated: 'Profilo aggiornato con successo',
        profileUpdateFailed: 'Impossibile aggiornare il profilo',
        passwordsMismatch: 'Le password non corrispondono',
        passwordTooShort: 'La password deve contenere almeno 8 caratteri',
        passwordHasSpaces: 'La password non può contenere spazi',
        passwordUpdated: 'Password aggiornata con successo',
        passwordUpdateFailed: 'Impossibile aggiornare la password',
        loggedOut: 'Disconnesso con successo',
        logoutFailed: 'Impossibile disconnettersi',
        listingsLoadFailed: 'Impossibile caricare le tue inserzioni',
        resolve: 'Risolvi',
        delete: 'Elimina',
        resolveConfirm: 'Contrassegnare questo elemento come risolto? Verrà rimosso dal feed pubblico.',
        resolved: 'Elemento contrassegnato come risolto',
        resolveFailed: "Impossibile risolvere l'elenco",
        deleteConfirm: 'Sei sicuro di voler eliminare questa inserzione? Questa azione non può essere annullata.',
        deleted: 'Annuncio cancellato',
        deleteFailed: "Impossibile eliminare l'elenco",
        verificationSent: 'Email di verifica inviata! Controlla la tua casella di posta.',
        verificationFailed: "Impossibile inviare l'e-mail di verifica"
      },
      lost: {
        documentTitle: 'Oggetti smarriti - Traceback',
        description: 'Sfoglia gli oggetti smarriti segnalati dalla nostra community',
        pageTitle: 'Oggetti smarriti',
        reportTitle: 'Segnala un oggetto smarrito',
        signInPrompt: 'Accedi per inviare oggetti smarriti.',
        searchTitle: 'Cerca oggetti smarriti',
        itemName: "Nome dell'articolo",
        itemNamePlaceholder: 'per esempio. Zaino North Face nero',
        category: 'Categoria',
        selectCategory: 'Seleziona una categoria',
        dateLost: 'Data smarrimento',
        location: "Posizione vista l'ultima volta",
        selectLocation: 'Seleziona una posizione',
        describeLocation: 'Descrivi la posizione',
        describeLocationPlaceholder: 'per esempio. La stanza del signor Anderson, vicino alla fontana',
        tags: 'Tag',
        tagsPlaceholder: 'per esempio. rosso, Nike, cerniera...',
        addedTags: 'Tag aggiunti',
        descriptionLabel: 'Descrizione',
        descriptionPlaceholder: "Qualcos'altro che aiuta a identificarlo?",
        imageUpload: 'Caricamento immagini',
        signInNow: 'Accedi ora',
        searchItemNamePlaceholder: 'Cerca per nome articolo...',
        searchTagsPlaceholder: 'Cerca per tag...',
        locationLost: 'Posizione perduta',
        searchLocationPlaceholder: 'Posizione persa...',
        dateFrom: 'Data da',
        dateTo: 'Data a',
        sort: 'Ordinare',
        oldestFirst: 'Prima il più vecchio',
        newestFirst: 'Prima il più recente'
      },
      found: {
        documentTitle: 'Oggetti trovati - Traceback',
        description: 'Sfoglia gli oggetti trovati segnalati dalla nostra community',
        pageTitle: 'Oggetti trovati',
        reportTitle: 'Segnala un oggetto trovato',
        signInPrompt: 'Accedi per inviare oggetti trovati.',
        searchTitle: 'Cerca oggetti trovati',
        itemName: "Nome dell'articolo",
        itemNamePlaceholder: 'per esempio. Zaino North Face nero',
        category: 'Categoria',
        selectCategory: 'Seleziona una categoria',
        dateFound: 'Data ritrovamento',
        location: 'Posizione trovata',
        selectLocation: 'Seleziona una posizione',
        describeLocation: 'Descrivi la posizione',
        describeLocationPlaceholder: 'per esempio. La stanza del signor Anderson, vicino alla fontana',
        tags: 'Tag',
        tagsPlaceholder: 'per esempio. rosso, Nike, cerniera...',
        addedTags: 'Tag aggiunti',
        descriptionLabel: 'Descrizione',
        descriptionPlaceholder: "Qualcos'altro che aiuta a identificarlo?",
        imageUpload: 'Caricamento immagini',
        signInNow: 'Accedi ora',
        searchItemNamePlaceholder: 'Cerca per nome articolo...',
        searchTagsPlaceholder: 'Cerca per tag...',
        locationFound: 'Posizione trovata',
        searchLocationPlaceholder: 'Posizione trovata...',
        dateFrom: 'Data da',
        dateTo: 'Data a',
        sort: 'Ordinare',
        oldestFirst: 'Prima il più vecchio',
        newestFirst: 'Prima il più recente'
      },
      forms: {
        categories: {
          electronics: 'Elettronica',
          clothing: 'Vestiario',
          id: "Carta d'identità/chiave magnetica",
          keys: 'Chiavi',
          bags: 'Zaino/Borse',
          bottle: "Bottiglia d'acqua",
          jewelry: 'Gioielli',
          supplies: 'Libri/forniture',
          other: 'Altro'
        },
        locations: {
          library: 'Biblioteca',
          gym: 'Palestra',
          cafeteria: 'Caffetteria',
          hallway: 'Corridoio principale',
          classroom: 'Aula',
          parking: 'Parcheggio',
          bathroom: 'Bagno',
          office: 'Segreteria',
          other: 'Altro...'
        },
        removeTag: 'Rimuovi il tag {tag}',
        previewUpload: "Anteprima dell'immagine caricata",
        imageToCrop: 'Immagine da ritagliare',
        accountSaved: 'Preferenza di aspetto salvata',
        languageSaved: 'Preferenza della lingua salvata su questo dispositivo',
        showPassword: 'Mostra password',
        hidePassword: 'Nascondi la password'
      }
    },
    hi: {
        common: {
            brandTagline: 'दुनिया को थोड़ा कम खोया हुआ बनाने की कोशिश, एक चीज़ करके।',
            copyright: '© 2026 Traceback. सर्वाधिकार सुरक्षित।',
            close: 'बंद करें',
            cancel: 'रद्द करें',
            submit: 'जमा करें',
            search: 'खोजें',
            resetFilters: 'फ़िल्टर रीसेट करें',
            loadMore: 'और लोड करें',
            signInNow: 'अभी साइन इन करें',
            contactReporter: 'रिपोर्टर से संपर्क करें',
            cropImage: 'छवि क्रॉप करें',
            cropUse: 'क्रॉप करके उपयोग करें',
            photoHint: 'वस्तु पहचानने में मदद के लिए फोटो आवश्यक है। (अधिकतम 5 MB)',
            imageRequired: 'एक छवि आवश्यक है।',
            submitting: 'जमा किया जा रहा है...',
            submitFailed: 'वस्तु सबमिट नहीं हो सकी।',
            noItemsFound: 'कोई वस्तु नहीं मिली।',
            itemsLoadFailed: 'वस्तुएँ लोड नहीं हो सकीं। कृपया बाद में फिर प्रयास करें।',
            contactUnavailable: 'संपर्क जानकारी उपलब्ध नहीं है',
            passwordStrength: ['', 'कमज़ोर', 'ठीक-ठाक', 'अच्छा', 'मज़बूत', 'बहुत मज़बूत'],
        },
        nav: { home: 'होम', lost: 'खोया', found: 'मिला', signIn: 'साइन इन', account: 'खाता' },
        home: {
            documentTitle: 'Traceback',
            description: 'Traceback एक वेबसाइट है जो लोगों को खोई हुई चीज़ें ढूंढने में मदद करती है।',
            ogTitle: 'Traceback - अपनी खोई चीज़ें ढूंढें',
            ogDescription: 'रिपोर्ट करने, खोजने और खोई चीज़ें वापस पाने के लिए समुदाय आधारित प्लेटफ़ॉर्म।',
            heroTitle: 'अपनी खोई हुई चीज़ें खोजें',
            getStarted: 'शुरू करें',
            introLead: 'एक आसान ऐप जिससे आप ',
            typewriterWords: ['खोज', 'वापसी', 'रिपोर्ट'],
            introTagline: 'देखने के लिए खाते की ज़रूरत नहीं। सेकंडों में पोस्ट करें।',
            feature1: 'फोटो क्रॉप करें और अपलोड करें',
            feature2: 'शीर्षक, टैग और स्थान से खोजें',
            feature3: 'एक क्लिक में संपर्क देखें',
            howTitle: 'यह कैसे काम करता है',
            howSubtitle: 'तीन आसान चरणों में आपकी चीज़ें वापस दिलाने में मदद।',
            step1Title: 'वस्तु रिपोर्ट करें',
            step1Body: 'जिस वस्तु को आपने खोया या पाया है उसकी फोटो और विवरण अपलोड करें। दूसरों की मदद के लिए टैग जोड़ें।',
            step2Title: 'खोजें और मिलान करें',
            step2Body: 'हमारा सिस्टम रिपोर्ट्स का मिलान करके पास की संभावित मैच ढूंढता है। श्रेणियों से दायरा कम करें।',
            step3Title: 'सुरक्षित वापसी',
            step3Body: 'मालिकाना सत्यापित करने और सुरक्षित स्थान तय करने के लिए प्लेटफ़ॉर्म के माध्यम से समन्वय करें।',
            stat1: 'वापस मिली वस्तुएँ',
            stat2: 'सक्रिय उपयोगकर्ता',
            stat3: 'समुदाय सहायता',
            ctaTitle: 'क्या आप अपनी चीज़ें वापस पाना चाहते हैं?',
            ctaBody: 'हज़ारों उपयोगकर्ताओं से जुड़ें जो एक-दूसरे की मदद कर रहे हैं।',
            ctaPrimary: 'खाता बनाएँ',
            ctaSecondary: 'खोई वस्तुएँ देखें',
        },
        login: {
            documentTitle: 'साइन इन - Traceback',
            description: 'अपने Traceback खाते में साइन इन करें',
            pageTitle: 'साइन इन',
            pageSubtitle: 'Traceback में फिर से स्वागत है',
            google: 'Google से साइन इन करें',
            or: 'या',
            emailAddress: 'ईमेल पता',
            password: 'पासवर्ड',
            passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
            signIn: 'साइन इन',
            signingIn: 'साइन इन हो रहा है…',
            forgotPassword: 'पासवर्ड भूल गए?',
            checkInbox: 'अपना इनबॉक्स देखें',
            verificationSentTo: 'हमने <strong><span id="verification-email"></span></strong> पर सत्यापन ईमेल भेजा है।',
            verificationInstruction: 'खाता सक्रिय करने के लिए ईमेल के लिंक पर क्लिक करें, फिर यहाँ वापस आकर साइन इन करें।',
            resendVerificationEmail: 'सत्यापन ईमेल फिर भेजें',
            sending: 'भेजा जा रहा है…',
            signOutUseDifferent: 'साइन आउट करें और दूसरा खाता उपयोग करें',
            noAccount: 'क्या आपका खाता नहीं है? साइन अप करें',
            resetTitle: 'पासवर्ड रीसेट करें',
            resetBody: 'अपना ईमेल पता दर्ज करें और हम आपको पासवर्ड रीसेट लिंक भेजेंगे।',
            sendResetLink: 'रीसेट लिंक भेजें',
            recoverySent: 'रिकवरी ईमेल भेज दिया गया! अपना इनबॉक्स देखें।',
            recoveryFailedPrefix: 'रिकवरी ईमेल भेजने में विफल: ',
            verificationSentToast: 'सत्यापन ईमेल भेज दिया गया! अपना इनबॉक्स देखें।',
            verificationFailedPrefix: 'ईमेल भेजने में विफल: ',
            invalidCredentials: 'अमान्य क्रेडेंशियल्स। यदि आपने Google से पंजीकरण किया है, तो "Google से साइन इन करें" बटन का उपयोग करें।',
            loginFailedPrefix: 'लॉगिन विफल: ',
            googleFailed: 'Google साइन-इन विफल रहा। फिर से प्रयास करें।',
        },
        signup: {
            documentTitle: 'साइन अप - Traceback',
            description: 'Traceback खाता बनाएँ',
            pageTitle: 'साइन अप',
            pageSubtitle: 'Traceback समुदाय से जुड़ें',
            google: 'Google से साइन अप करें',
            or: 'या',
            emailAddress: 'ईमेल पता',
            username: 'यूज़रनेम',
            usernamePlaceholder: '3-20 अक्षर (अक्षर, अंक, _)',
            usernameTitle: 'यूज़रनेम 3-20 अक्षरों का होना चाहिए और इसमें केवल अक्षर, अंक और अंडरस्कोर हो सकते हैं।',
            password: 'पासवर्ड',
            passwordPlaceholder: 'पासवर्ड बनाएँ (कम से कम 8 अक्षर)',
            confirmPassword: 'पासवर्ड की पुष्टि करें',
            confirmPasswordPlaceholder: 'अपना पासवर्ड फिर दर्ज करें',
            signUp: 'साइन अप',
            creatingAccount: 'खाता बनाया जा रहा है…',
            alreadyHaveAccount: 'क्या आपके पास पहले से खाता है? साइन इन करें',
            passwordsMismatch: 'पासवर्ड मेल नहीं खाते!',
            invalidUsername: 'यूज़रनेम 3-20 अक्षरों का होना चाहिए और केवल अक्षर, अंक और अंडरस्कोर शामिल कर सकता है।',
            accountCreatedVerify: 'खाता बन गया! अपने ईमेल सत्यापन के लिए इनबॉक्स देखें।',
            accountCreatedVerifyFailed: 'खाता बन गया, लेकिन सत्यापन ईमेल भेजा नहीं जा सका।',
            signupFailedPrefix: 'साइनअप विफल: ',
        },
        reset: {
            documentTitle: 'पासवर्ड रीसेट - Traceback',
            description: 'अपने Traceback खाते का पासवर्ड रीसेट करें',
            pageTitle: 'पासवर्ड रीसेट करें',
            pageSubtitle: 'नीचे अपना नया पासवर्ड दर्ज करें',
            newPassword: 'नया पासवर्ड',
            newPasswordPlaceholder: 'कम से कम 8 अक्षर',
            confirmPassword: 'पासवर्ड की पुष्टि करें',
            confirmPasswordPlaceholder: 'नए पासवर्ड की पुष्टि करें',
            resetPassword: 'पासवर्ड रीसेट करें',
            resetting: 'रीसेट हो रहा है...',
            invalidLink: 'अमान्य या समाप्त रीसेट लिंक।',
            passwordsMismatch: 'पासवर्ड मेल नहीं खाते।',
            passwordTooShort: 'पासवर्ड कम से कम 8 अक्षरों का होना चाहिए।',
            passwordHasSpaces: 'पासवर्ड में खाली स्थान नहीं हो सकते।',
            resetSuccess: 'पासवर्ड सफलतापूर्वक रीसेट हो गया! लॉगिन पर ले जाया जा रहा है...',
            resetFailedPrefix: 'पासवर्ड रीसेट नहीं हो सका: ',
        },
        verify: {
            documentTitle: 'ईमेल सत्यापन - Traceback',
            description: 'अपने Traceback खाते का ईमेल सत्यापित करें',
            pageTitle: 'ईमेल सत्यापन',
            verifying: 'आपका ईमेल सत्यापित किया जा रहा है...',
            invalidLink: 'अमान्य सत्यापन लिंक।',
            missingParams: 'सत्यापन पैरामीटर गायब हैं।',
            success: 'ईमेल सफलतापूर्वक सत्यापित हुआ! पुनर्निर्देशित किया जा रहा है...',
            successToast: 'आपका ईमेल सत्यापित हो गया है!',
            failed: 'सत्यापन विफल हुआ।',
            failedPrefix: 'सत्यापन विफल: ',
        },
        error: {
            documentTitle: 'साइन इन त्रुटि - Traceback',
            description: 'अपने Traceback खाते में साइन इन करें',
            pageTitle: 'साइन इन त्रुटि',
            defaultMessage: 'साइन इन के दौरान एक त्रुटि हुई। कृपया फिर प्रयास करें।',
            unexpectedMessage: 'साइन इन के दौरान एक अप्रत्याशित त्रुटि हुई।',
            returnToLogin: 'लॉगिन पर लौटें',
            googleFailedPrefix: 'Google साइन-इन विफल रहा। ',
        },
        account: {
            documentTitle: 'मेरा खाता - Traceback',
            description: 'अपने Traceback खाते का प्रबंधन करें',
            loadingProfile: 'प्रोफ़ाइल लोड हो रही है...',
            pleaseWait: 'कृपया प्रतीक्षा करें',
            checkingStatus: 'स्थिति जाँची जा रही है...',
            resendVerificationEmail: 'सत्यापन ईमेल फिर भेजें',
            emailSent: 'ईमेल भेज दिया गया',
            signOut: 'साइन आउट',
            settingsTitle: 'खाता सेटिंग्स',
            preferences: 'प्राथमिकताएँ',
            language: 'भाषा',
            preferencesSaved: 'इस डिवाइस के लोकल स्टोरेज में सहेजा गया।',
            appearance: 'दिखावट',
            dyslexicFont: 'डिस्लेक्सिया फ़ॉन्ट',
            appearanceHelp: 'जब तक आप कोई विशेष मोड न चुनें, डिवाइस थीम उपयोग होगी।',
            systemDefault: 'सिस्टम डिफ़ॉल्ट',
            light: 'हल्का',
            dark: 'गहरा',
            updateProfile: 'प्रोफ़ाइल अपडेट करें',
            displayName: 'प्रदर्शित नाम',
            displayNamePlaceholder: 'नया नाम दर्ज करें',
            save: 'सहेजें',
            changePassword: 'पासवर्ड बदलें',
            currentPassword: 'वर्तमान पासवर्ड',
            currentPasswordPlaceholder: 'वर्तमान पासवर्ड दर्ज करें',
            newPassword: 'नया पासवर्ड',
            newPasswordPlaceholder: 'कम से कम 8 अक्षर',
            confirmPassword: 'पासवर्ड की पुष्टि करें',
            confirmPasswordPlaceholder: 'नए पासवर्ड की पुष्टि करें',
            updatePassword: 'पासवर्ड अपडेट करें',
            myListings: 'मेरी सूची',
            reportNewLostItem: 'नई खोई वस्तु रिपोर्ट करें',
            noPosts: 'आपने अभी तक कोई वस्तु पोस्ट नहीं की है।',
            loadMore: 'और लोड करें',
            verifiedUser: 'सत्यापित उपयोगकर्ता',
            unverifiedEmail: 'असत्यापित ईमेल',
            profileUpdated: 'प्रोफ़ाइल सफलतापूर्वक अपडेट हुई',
            profileUpdateFailed: 'प्रोफ़ाइल अपडेट नहीं हो सकी',
            passwordsMismatch: 'पासवर्ड मेल नहीं खाते',
            passwordTooShort: 'पासवर्ड कम से कम 8 अक्षरों का होना चाहिए',
            passwordHasSpaces: 'पासवर्ड में खाली स्थान नहीं हो सकते',
            passwordUpdated: 'पासवर्ड सफलतापूर्वक अपडेट हुआ',
            passwordUpdateFailed: 'पासवर्ड अपडेट नहीं हो सका',
            loggedOut: 'सफलतापूर्वक साइन आउट हो गया',
            logoutFailed: 'साइन आउट विफल रहा',
            listingsLoadFailed: 'आपकी सूची लोड नहीं हो सकी',
            resolve: 'सुलझाएँ',
            delete: 'हटाएँ',
            resolveConfirm: 'क्या इस वस्तु को सुलझा हुआ चिह्नित करना है? इसे सार्वजनिक फ़ीड से हटा दिया जाएगा।',
            resolved: 'वस्तु को सुलझा हुआ चिह्नित किया गया',
            resolveFailed: 'सूची को सुलझाया नहीं जा सका',
            deleteConfirm: 'क्या आप वाकई इस सूची को हटाना चाहते हैं? यह क्रिया वापस नहीं होगी।',
            deleted: 'सूची हटा दी गई',
            deleteFailed: 'सूची हटाई नहीं जा सकी',
            verificationSent: 'सत्यापन ईमेल भेज दिया गया! अपना इनबॉक्स देखें।',
            verificationFailed: 'सत्यापन ईमेल भेजा नहीं जा सका',
        },
        lost: {
            documentTitle: 'खोई वस्तुएँ - Traceback',
            description: 'हमारे समुदाय द्वारा रिपोर्ट की गई खोई वस्तुओं को देखें',
            pageTitle: 'खोई वस्तुएँ',
            reportTitle: 'खोई वस्तु रिपोर्ट करें',
            signInPrompt: 'खोई वस्तुएँ जमा करने के लिए साइन इन करें।',
            searchTitle: 'खोई वस्तुएँ खोजें',
            itemName: 'वस्तु का नाम',
            itemNamePlaceholder: 'उदा. काला North Face बैकपैक',
            category: 'श्रेणी',
            selectCategory: 'श्रेणी चुनें',
            dateLost: 'खोने की तारीख',
            location: 'आख़िरी बार देखा गया स्थान',
            selectLocation: 'स्थान चुनें',
            describeLocation: 'स्थान का वर्णन करें',
            describeLocationPlaceholder: 'उदा. एंडरसन सर का कमरा, पानी के फव्वारे के पास',
            tags: 'टैग',
            tagsPlaceholder: 'उदा. लाल, Nike, ज़िपर...',
            addedTags: 'जोड़े गए टैग',
            descriptionLabel: 'विवरण',
            descriptionPlaceholder: 'पहचान में मदद करने वाली कोई और बात?',
            imageUpload: 'छवि अपलोड',
            signInNow: 'अभी साइन इन करें',
            searchItemNamePlaceholder: 'वस्तु नाम से खोजें...',
            searchTagsPlaceholder: 'टैग से खोजें...',
            locationLost: 'खोने का स्थान',
            searchLocationPlaceholder: 'खोने का स्थान...',
            dateFrom: 'तारीख से',
            dateTo: 'तारीख तक',
            sort: 'क्रमबद्ध करें',
            oldestFirst: 'सबसे पुराने पहले',
            newestFirst: 'सबसे नए पहले',
        },
        found: {
            documentTitle: 'मिली वस्तुएँ - Traceback',
            description: 'हमारे समुदाय द्वारा रिपोर्ट की गई मिली वस्तुओं को देखें',
            pageTitle: 'मिली वस्तुएँ',
            reportTitle: 'मिली वस्तु रिपोर्ट करें',
            signInPrompt: 'मिली वस्तुएँ जमा करने के लिए साइन इन करें।',
            searchTitle: 'मिली वस्तुएँ खोजें',
            itemName: 'वस्तु का नाम',
            itemNamePlaceholder: 'उदा. काला North Face बैकपैक',
            category: 'श्रेणी',
            selectCategory: 'श्रेणी चुनें',
            dateFound: 'मिलने की तारीख',
            location: 'मिलने का स्थान',
            selectLocation: 'स्थान चुनें',
            describeLocation: 'स्थान का वर्णन करें',
            describeLocationPlaceholder: 'उदा. एंडरसन सर का कमरा, पानी के फव्वारे के पास',
            tags: 'टैग',
            tagsPlaceholder: 'उदा. लाल, Nike, ज़िपर...',
            addedTags: 'जोड़े गए टैग',
            descriptionLabel: 'विवरण',
            descriptionPlaceholder: 'पहचान में मदद करने वाली कोई और बात?',
            imageUpload: 'छवि अपलोड',
            signInNow: 'अभी साइन इन करें',
            searchItemNamePlaceholder: 'वस्तु नाम से खोजें...',
            searchTagsPlaceholder: 'टैग से खोजें...',
            locationFound: 'मिलने का स्थान',
            searchLocationPlaceholder: 'मिलने का स्थान...',
            dateFrom: 'तारीख से',
            dateTo: 'तारीख तक',
            sort: 'क्रमबद्ध करें',
            oldestFirst: 'सबसे पुराने पहले',
            newestFirst: 'सबसे नए पहले',
        },
        forms: {
            categories: { electronics: 'इलेक्ट्रॉनिक्स', clothing: 'कपड़े', id: 'आईडी/कीकार्ड', keys: 'चाबियाँ', bags: 'बैकपैक/बैग', bottle: 'पानी की बोतल', jewelry: 'आभूषण', supplies: 'किताबें/सामग्री', other: 'अन्य' },
            locations: { library: 'पुस्तकालय', gym: 'जिम', cafeteria: 'कैफेटेरिया', hallway: 'मुख्य गलियारा', classroom: 'कक्षा', parking: 'पार्किंग लॉट', bathroom: 'बाथरूम', office: 'मुख्य कार्यालय', other: 'अन्य...' },
            removeTag: 'टैग हटाएँ {tag}',
            previewUpload: 'अपलोड की गई छवि का पूर्वावलोकन',
            imageToCrop: 'क्रॉप करने की छवि',
            accountSaved: 'दिखावट वरीयता सहेजी गई',
            languageSaved: 'भाषा वरीयता इस डिवाइस पर सहेजी गई',
            showPassword: 'पासवर्ड दिखाएँ',
            hidePassword: 'पासवर्ड छिपाएँ',
        }
    },
    zh: {
        common: {
            brandTagline: '让世界少一点遗失，一次找回一件物品。',
            copyright: '© 2026 Traceback。保留所有权利。',
            close: '关闭',
            cancel: '取消',
            submit: '提交',
            search: '搜索',
            resetFilters: '重置筛选',
            loadMore: '加载更多',
            signInNow: '立即登录',
            contactReporter: '联系发布者',
            cropImage: '裁剪图片',
            cropUse: '裁剪并使用',
            photoHint: '需要上传照片以帮助识别物品。（最大 5 MB）',
            imageRequired: '必须上传图片。',
            submitting: '提交中...',
            submitFailed: '提交物品失败。',
            noItemsFound: '未找到物品。',
            itemsLoadFailed: '加载物品失败，请稍后再试。',
            contactUnavailable: '暂无联系方式',
            passwordStrength: ['', '弱', '一般', '良好', '强', '非常强'],
        },
        nav: { home: '首页', lost: '失物', found: '招领', signIn: '登录', account: '账户' },
        home: {
            documentTitle: 'Traceback',
            description: 'Traceback 是一个帮助人们找回遗失物品的网站。',
            ogTitle: 'Traceback - 找回你的失物',
            ogDescription: '一个由社区驱动的平台，用于报告、搜索和找回失物。',
            heroTitle: '找回你的失物',
            getStarted: '开始使用',
            introLead: '一个简单的应用，用于',
            typewriterWords: ['搜索', '找回', '报告'],
            introTagline: '无需账户即可浏览。几秒内即可发布。',
            feature1: '裁剪并上传照片',
            feature2: '按标题、标签和地点搜索',
            feature3: '一键查看联系方式',
            howTitle: '使用方式',
            howSubtitle: '三步帮你重新找回重要物品。',
            step1Title: '提交物品信息',
            step1Body: '上传你丢失或拾到物品的照片和描述。添加标签帮助他人找到它。',
            step2Title: '搜索并匹配',
            step2Body: '系统会交叉比对报告，寻找附近可能匹配的物品。按类别浏览可进一步缩小范围。',
            step3Title: '安全归还',
            step3Body: '通过平台协调，核验所有权并安排安全的交接地点。',
            stat1: '成功找回物品',
            stat2: '活跃用户',
            stat3: '社区支持',
            ctaTitle: '准备好找回你的物品了吗？',
            ctaBody: '加入数千名互相帮助找回重要物品的用户。',
            ctaPrimary: '创建账户',
            ctaSecondary: '浏览失物',
        },
        login: {
            documentTitle: '登录 - Traceback',
            description: '登录你的 Traceback 账户',
            pageTitle: '登录',
            pageSubtitle: '欢迎回到 Traceback',
            google: '使用 Google 登录',
            or: '或',
            emailAddress: '邮箱地址',
            password: '密码',
            passwordPlaceholder: '输入你的密码',
            signIn: '登录',
            signingIn: '登录中…',
            forgotPassword: '忘记密码？',
            checkInbox: '请查看收件箱',
            verificationSentTo: '我们已向 <strong><span id="verification-email"></span></strong> 发送验证邮件。',
            verificationInstruction: '点击邮件中的链接激活账户，然后返回这里登录。',
            resendVerificationEmail: '重新发送验证邮件',
            sending: '发送中…',
            signOutUseDifferent: '退出并使用其他账户',
            noAccount: '还没有账户？注册',
            resetTitle: '重置密码',
            resetBody: '输入你的邮箱地址，我们会发送重置密码链接。',
            sendResetLink: '发送重置链接',
            recoverySent: '恢复邮件已发送！请查看收件箱。',
            recoveryFailedPrefix: '发送恢复邮件失败：',
            verificationSentToast: '验证邮件已发送！请查看收件箱。',
            verificationFailedPrefix: '发送邮件失败：',
            invalidCredentials: '凭据无效。如果你是通过 Google 注册，请使用“使用 Google 登录”按钮。',
            loginFailedPrefix: '登录失败：',
            googleFailed: 'Google 登录失败。请重试。',
        },
        signup: {
            documentTitle: '注册 - Traceback',
            description: '创建 Traceback 账户',
            pageTitle: '注册',
            pageSubtitle: '加入 Traceback 社区',
            google: '使用 Google 注册',
            or: '或',
            emailAddress: '邮箱地址',
            username: '用户名',
            usernamePlaceholder: '3-20 个字符（字母、数字、_）',
            usernameTitle: '用户名必须为 3-20 个字符，只能包含字母、数字和下划线。',
            password: '密码',
            passwordPlaceholder: '创建密码（至少 8 个字符）',
            confirmPassword: '确认密码',
            confirmPasswordPlaceholder: '再次输入密码',
            signUp: '注册',
            creatingAccount: '正在创建账户…',
            alreadyHaveAccount: '已有账户？登录',
            passwordsMismatch: '密码不一致！',
            invalidUsername: '用户名必须为 3-20 个字符，且只能包含字母、数字和下划线。',
            accountCreatedVerify: '账户已创建！请查看邮箱并完成验证。',
            accountCreatedVerifyFailed: '账户已创建，但验证邮件发送失败。',
            signupFailedPrefix: '注册失败：',
        },
        reset: {
            documentTitle: '重置密码 - Traceback',
            description: '重置你的 Traceback 账户密码',
            pageTitle: '重置密码',
            pageSubtitle: '请在下方输入新密码',
            newPassword: '新密码',
            newPasswordPlaceholder: '至少 8 个字符',
            confirmPassword: '确认密码',
            confirmPasswordPlaceholder: '确认新密码',
            resetPassword: '重置密码',
            resetting: '重置中...',
            invalidLink: '重置链接无效或已过期。',
            passwordsMismatch: '密码不一致。',
            passwordTooShort: '密码至少需要 8 个字符。',
            passwordHasSpaces: '密码不能包含空格。',
            resetSuccess: '密码重置成功！正在跳转到登录页面...',
            resetFailedPrefix: '重置密码失败：',
        },
        verify: {
            documentTitle: '邮箱验证 - Traceback',
            description: '验证你的 Traceback 账户邮箱',
            pageTitle: '邮箱验证',
            verifying: '正在验证你的邮箱地址...',
            invalidLink: '验证链接无效。',
            missingParams: '缺少验证参数。',
            success: '邮箱验证成功！正在跳转...',
            successToast: '你的邮箱已验证成功！',
            failed: '验证失败。',
            failedPrefix: '验证失败：',
        },
        error: {
            documentTitle: '登录错误 - Traceback',
            description: '登录你的 Traceback 账户',
            pageTitle: '登录错误',
            defaultMessage: '登录过程中发生错误。请重试。',
            unexpectedMessage: '登录过程中发生未知错误。',
            returnToLogin: '返回登录',
            googleFailedPrefix: 'Google 登录失败。 ',
        },
        account: {
            documentTitle: '我的账户 - Traceback',
            description: '管理你的 Traceback 账户',
            loadingProfile: '正在加载资料...',
            pleaseWait: '请稍候',
            checkingStatus: '正在检查状态...',
            resendVerificationEmail: '重新发送验证邮件',
            emailSent: '邮件已发送',
            signOut: '退出登录',
            settingsTitle: '账户设置',
            preferences: '偏好设置',
            language: '语言',
            preferencesSaved: '已保存在此设备的本地存储中。',
            appearance: '外观',
            dyslexicFont: '阅读障碍字体',
            appearanceHelp: '默认跟随设备主题，除非你选择了特定模式。',
            systemDefault: '跟随系统',
            light: '浅色',
            dark: '深色',
            updateProfile: '更新资料',
            displayName: '显示名称',
            displayNamePlaceholder: '输入新的名称',
            save: '保存',
            changePassword: '修改密码',
            currentPassword: '当前密码',
            currentPasswordPlaceholder: '输入当前密码',
            newPassword: '新密码',
            newPasswordPlaceholder: '至少 8 个字符',
            confirmPassword: '确认密码',
            confirmPasswordPlaceholder: '确认新密码',
            updatePassword: '更新密码',
            myListings: '我的发布',
            reportNewLostItem: '报告新的失物',
            noPosts: '你还没有发布任何物品。',
            loadMore: '加载更多',
            verifiedUser: '已验证用户',
            unverifiedEmail: '邮箱未验证',
            profileUpdated: '资料更新成功',
            profileUpdateFailed: '资料更新失败',
            passwordsMismatch: '密码不一致',
            passwordTooShort: '密码至少需要 8 个字符',
            passwordHasSpaces: '密码不能包含空格',
            passwordUpdated: '密码更新成功',
            passwordUpdateFailed: '密码更新失败',
            loggedOut: '已成功退出登录',
            logoutFailed: '退出登录失败',
            listingsLoadFailed: '加载你的发布失败',
            resolve: '标记完成',
            delete: '删除',
            resolveConfirm: '将此物品标记为已解决？它将从公开列表中移除。',
            resolved: '物品已标记为已解决',
            resolveFailed: '无法标记为已解决',
            deleteConfirm: '确定要删除此发布吗？此操作无法撤销。',
            deleted: '发布已删除',
            deleteFailed: '删除发布失败',
            verificationSent: '验证邮件已发送！请查看收件箱。',
            verificationFailed: '发送验证邮件失败',
        },
        lost: {
            documentTitle: '失物 - Traceback',
            description: '浏览社区报告的失物信息',
            pageTitle: '失物',
            reportTitle: '报告失物',
            signInPrompt: '登录后才能提交失物信息。',
            searchTitle: '搜索失物',
            itemName: '物品名称',
            itemNamePlaceholder: '例如：黑色 North Face 双肩包',
            category: '类别',
            selectCategory: '选择类别',
            dateLost: '丢失日期',
            location: '最后出现地点',
            selectLocation: '选择地点',
            describeLocation: '描述地点',
            describeLocationPlaceholder: '例如：Anderson 老师教室，饮水机附近',
            tags: '标签',
            tagsPlaceholder: '例如：红色、Nike、拉链...',
            addedTags: '已添加标签',
            descriptionLabel: '描述',
            descriptionPlaceholder: '还有什么能帮助识别的细节？',
            imageUpload: '上传图片',
            signInNow: '立即登录',
            searchItemNamePlaceholder: '按物品名称搜索...',
            searchTagsPlaceholder: '按标签搜索...',
            locationLost: '丢失地点',
            searchLocationPlaceholder: '丢失地点...',
            dateFrom: '开始日期',
            dateTo: '结束日期',
            sort: '排序',
            oldestFirst: '最早优先',
            newestFirst: '最新优先',
        },
        found: {
            documentTitle: '招领 - Traceback',
            description: '浏览社区报告的拾到物品信息',
            pageTitle: '招领',
            reportTitle: '报告拾到物品',
            signInPrompt: '登录后才能提交拾到物品信息。',
            searchTitle: '搜索招领物品',
            itemName: '物品名称',
            itemNamePlaceholder: '例如：黑色 North Face 双肩包',
            category: '类别',
            selectCategory: '选择类别',
            dateFound: '拾到日期',
            location: '拾到地点',
            selectLocation: '选择地点',
            describeLocation: '描述地点',
            describeLocationPlaceholder: '例如：Anderson 老师教室，饮水机附近',
            tags: '标签',
            tagsPlaceholder: '例如：红色、Nike、拉链...',
            addedTags: '已添加标签',
            descriptionLabel: '描述',
            descriptionPlaceholder: '还有什么能帮助识别的细节？',
            imageUpload: '上传图片',
            signInNow: '立即登录',
            searchItemNamePlaceholder: '按物品名称搜索...',
            searchTagsPlaceholder: '按标签搜索...',
            locationFound: '拾到地点',
            searchLocationPlaceholder: '拾到地点...',
            dateFrom: '开始日期',
            dateTo: '结束日期',
            sort: '排序',
            oldestFirst: '最早优先',
            newestFirst: '最新优先',
        },
        forms: {
            categories: { electronics: '电子产品', clothing: '衣物', id: '证件/门卡', keys: '钥匙', bags: '背包/包袋', bottle: '水瓶', jewelry: '首饰', supplies: '书籍/用品', other: '其他' },
            locations: { library: '图书馆', gym: '体育馆', cafeteria: '食堂', hallway: '主走廊', classroom: '教室', parking: '停车场', bathroom: '洗手间', office: '前台办公室', other: '其他...' },
            removeTag: '移除标签 {tag}',
            previewUpload: '已上传图片预览',
            imageToCrop: '待裁剪图片',
            accountSaved: '外观偏好已保存',
            languageSaved: '语言偏好已保存在此设备上',
            showPassword: '显示密码',
            hidePassword: '隐藏密码',
        }
    },
    ar: {
        common: {
            brandTagline: 'نجعل العالم أقل ضياعًا قليلًا، غرضًا بعد غرض.',
            copyright: '© 2026 Traceback. جميع الحقوق محفوظة.',
            close: 'إغلاق',
            cancel: 'إلغاء',
            submit: 'إرسال',
            search: 'بحث',
            resetFilters: 'إعادة ضبط الفلاتر',
            loadMore: 'تحميل المزيد',
            signInNow: 'سجّل الدخول الآن',
            contactReporter: 'التواصل مع المبلّغ',
            cropImage: 'اقتصاص الصورة',
            cropUse: 'اقتصاص واستخدام',
            photoHint: 'الصورة مطلوبة للمساعدة في التعرف على الغرض. (الحد الأقصى 5 ميغابايت)',
            imageRequired: 'الصورة مطلوبة.',
            submitting: 'جارٍ الإرسال...',
            submitFailed: 'تعذر إرسال الغرض.',
            noItemsFound: 'لم يتم العثور على أي أغراض.',
            itemsLoadFailed: 'تعذر تحميل الأغراض. حاول مرة أخرى لاحقًا.',
            contactUnavailable: 'معلومات الاتصال غير متاحة',
            passwordStrength: ['', 'ضعيف', 'مقبول', 'جيد', 'قوي', 'قوي جدًا'],
        },
        nav: { home: 'الرئيسية', lost: 'مفقودات', found: 'معثورات', signIn: 'تسجيل الدخول', account: 'الحساب' },
        home: {
            documentTitle: 'Traceback',
            description: 'Traceback موقع يساعد الناس على العثور على الأشياء المفقودة.',
            ogTitle: 'Traceback - اعثر على أغراضك المفقودة',
            ogDescription: 'منصة مدعومة من المجتمع للإبلاغ عن المفقودات والبحث عنها واستعادتها.',
            heroTitle: 'اعثر على أغراضك المفقودة',
            getStarted: 'ابدأ الآن',
            introLead: 'تطبيق بسيط من أجل ',
            typewriterWords: ['البحث', 'الاستعادة', 'الإبلاغ'],
            introTagline: 'لا حاجة إلى حساب للتصفح. انشر خلال ثوانٍ.',
            feature1: 'اقتصاص الصور ورفعها',
            feature2: 'البحث بالعنوان والوسوم والموقع',
            feature3: 'إظهار التواصل بنقرة واحدة',
            howTitle: 'كيف يعمل',
            howSubtitle: 'إعادتك إلى مقتنياتك في ثلاث خطوات بسيطة.',
            step1Title: 'أبلغ عن الغرض',
            step1Body: 'ارفع صورة ووصفًا للغرض الذي فقدته أو وجدته. أضف وسومًا لمساعدة الآخرين على العثور عليه.',
            step2Title: 'ابحث وطابق',
            step2Body: 'يقارن النظام البلاغات للعثور على تطابقات محتملة قريبة. تصفح الفئات لتضييق النتائج.',
            step3Title: 'إرجاع آمن',
            step3Body: 'نسّق عبر المنصة للتحقق من الملكية وترتيب مكان آمن للتسليم.',
            stat1: 'أغراض أُعيدت لأصحابها',
            stat2: 'مستخدمون نشطون',
            stat3: 'دعم مجتمعي',
            ctaTitle: 'هل أنت مستعد لاستعادة مقتنياتك؟',
            ctaBody: 'انضم إلى آلاف المستخدمين الذين يساعدون بعضهم بعضًا في العثور على ما يهم.',
            ctaPrimary: 'إنشاء حساب',
            ctaSecondary: 'تصفح المفقودات',
        },
        login: {
            documentTitle: 'تسجيل الدخول - Traceback',
            description: 'سجّل الدخول إلى حسابك في Traceback',
            pageTitle: 'تسجيل الدخول',
            pageSubtitle: 'مرحبًا بعودتك إلى Traceback',
            google: 'سجّل الدخول باستخدام Google',
            or: 'أو',
            emailAddress: 'البريد الإلكتروني',
            password: 'كلمة المرور',
            passwordPlaceholder: 'أدخل كلمة المرور',
            signIn: 'تسجيل الدخول',
            signingIn: 'جارٍ تسجيل الدخول…',
            forgotPassword: 'هل نسيت كلمة المرور؟',
            checkInbox: 'تحقق من بريدك الوارد',
            verificationSentTo: 'أرسلنا رسالة تحقق إلى <strong><span id="verification-email"></span></strong>.',
            verificationInstruction: 'انقر على الرابط في البريد لتفعيل حسابك، ثم عُد إلى هنا وسجّل الدخول.',
            resendVerificationEmail: 'إعادة إرسال رسالة التحقق',
            sending: 'جارٍ الإرسال…',
            signOutUseDifferent: 'تسجيل الخروج واستخدام حساب مختلف',
            noAccount: 'ليس لديك حساب؟ أنشئ واحدًا',
            resetTitle: 'إعادة تعيين كلمة المرور',
            resetBody: 'أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.',
            sendResetLink: 'إرسال رابط إعادة التعيين',
            recoverySent: 'تم إرسال رسالة الاستعادة! تحقق من بريدك الوارد.',
            recoveryFailedPrefix: 'تعذر إرسال رسالة الاستعادة: ',
            verificationSentToast: 'تم إرسال رسالة التحقق! تحقق من بريدك الوارد.',
            verificationFailedPrefix: 'تعذر إرسال الرسالة: ',
            invalidCredentials: 'بيانات الاعتماد غير صحيحة. إذا سجلت عبر Google، فاستخدم زر "سجّل الدخول باستخدام Google".',
            loginFailedPrefix: 'فشل تسجيل الدخول: ',
            googleFailed: 'فشل تسجيل الدخول عبر Google. حاول مرة أخرى.',
        },
        signup: {
            documentTitle: 'إنشاء حساب - Traceback',
            description: 'أنشئ حساب Traceback',
            pageTitle: 'إنشاء حساب',
            pageSubtitle: 'انضم إلى مجتمع Traceback',
            google: 'أنشئ حسابًا باستخدام Google',
            or: 'أو',
            emailAddress: 'البريد الإلكتروني',
            username: 'اسم المستخدم',
            usernamePlaceholder: 'من 3 إلى 20 حرفًا (أحرف، أرقام، _)',
            usernameTitle: 'يجب أن يكون اسم المستخدم بين 3 و20 حرفًا وأن يحتوي فقط على أحرف وأرقام وشرطة سفلية.',
            password: 'كلمة المرور',
            passwordPlaceholder: 'أنشئ كلمة مرور (8 أحرف على الأقل)',
            confirmPassword: 'تأكيد كلمة المرور',
            confirmPasswordPlaceholder: 'أكد كلمة المرور',
            signUp: 'إنشاء حساب',
            creatingAccount: 'جارٍ إنشاء الحساب…',
            alreadyHaveAccount: 'لديك حساب بالفعل؟ سجّل الدخول',
            passwordsMismatch: 'كلمتا المرور غير متطابقتين!',
            invalidUsername: 'يجب أن يكون اسم المستخدم بين 3 و20 حرفًا وأن يحتوي فقط على أحرف وأرقام وشرطة سفلية.',
            accountCreatedVerify: 'تم إنشاء الحساب! تحقق من بريدك لتأكيده.',
            accountCreatedVerifyFailed: 'تم إنشاء الحساب، لكن تعذر إرسال رسالة التحقق.',
            signupFailedPrefix: 'فشل إنشاء الحساب: ',
        },
        reset: {
            documentTitle: 'إعادة تعيين كلمة المرور - Traceback',
            description: 'أعد تعيين كلمة مرور حسابك في Traceback',
            pageTitle: 'إعادة تعيين كلمة المرور',
            pageSubtitle: 'أدخل كلمة المرور الجديدة أدناه',
            newPassword: 'كلمة المرور الجديدة',
            newPasswordPlaceholder: '8 أحرف على الأقل',
            confirmPassword: 'تأكيد كلمة المرور',
            confirmPasswordPlaceholder: 'أكد كلمة المرور الجديدة',
            resetPassword: 'إعادة تعيين كلمة المرور',
            resetting: 'جارٍ إعادة التعيين...',
            invalidLink: 'رابط إعادة التعيين غير صالح أو منتهي.',
            passwordsMismatch: 'كلمتا المرور غير متطابقتين.',
            passwordTooShort: 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.',
            passwordHasSpaces: 'لا يمكن أن تحتوي كلمة المرور على مسافات.',
            resetSuccess: 'تمت إعادة تعيين كلمة المرور بنجاح! جارٍ التحويل إلى تسجيل الدخول...',
            resetFailedPrefix: 'تعذر إعادة تعيين كلمة المرور: ',
        },
        verify: {
            documentTitle: 'التحقق من البريد الإلكتروني - Traceback',
            description: 'تحقق من بريد حسابك في Traceback',
            pageTitle: 'التحقق من البريد الإلكتروني',
            verifying: 'جارٍ التحقق من بريدك الإلكتروني...',
            invalidLink: 'رابط التحقق غير صالح.',
            missingParams: 'معلمات التحقق مفقودة.',
            success: 'تم التحقق من البريد الإلكتروني بنجاح! جارٍ التحويل...',
            successToast: 'تم التحقق من بريدك الإلكتروني!',
            failed: 'فشل التحقق.',
            failedPrefix: 'فشل التحقق: ',
        },
        error: {
            documentTitle: 'خطأ في تسجيل الدخول - Traceback',
            description: 'سجّل الدخول إلى حسابك في Traceback',
            pageTitle: 'خطأ في تسجيل الدخول',
            defaultMessage: 'حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.',
            unexpectedMessage: 'حدث خطأ غير متوقع أثناء تسجيل الدخول.',
            returnToLogin: 'العودة إلى تسجيل الدخول',
            googleFailedPrefix: 'فشل تسجيل الدخول عبر Google. ',
        },
        account: {
            documentTitle: 'حسابي - Traceback',
            description: 'إدارة حسابك في Traceback',
            loadingProfile: 'جارٍ تحميل الملف الشخصي...',
            pleaseWait: 'يرجى الانتظار',
            checkingStatus: 'جارٍ التحقق من الحالة...',
            resendVerificationEmail: 'إعادة إرسال رسالة التحقق',
            emailSent: 'تم الإرسال',
            signOut: 'تسجيل الخروج',
            settingsTitle: 'إعدادات الحساب',
            preferences: 'التفضيلات',
            language: 'اللغة',
            preferencesSaved: 'تم الحفظ في التخزين المحلي على هذا الجهاز.',
            appearance: 'المظهر',
            dyslexicFont: 'خط عسر القراءة',
            appearanceHelp: 'يستخدم مظهر جهازك ما لم تختر وضعًا محددًا.',
            systemDefault: 'افتراضي النظام',
            light: 'فاتح',
            dark: 'داكن',
            updateProfile: 'تحديث الملف الشخصي',
            displayName: 'اسم العرض',
            displayNamePlaceholder: 'أدخل اسمًا جديدًا',
            save: 'حفظ',
            changePassword: 'تغيير كلمة المرور',
            currentPassword: 'كلمة المرور الحالية',
            currentPasswordPlaceholder: 'أدخل كلمة المرور الحالية',
            newPassword: 'كلمة المرور الجديدة',
            newPasswordPlaceholder: '8 أحرف على الأقل',
            confirmPassword: 'تأكيد كلمة المرور',
            confirmPasswordPlaceholder: 'أكد كلمة المرور الجديدة',
            updatePassword: 'تحديث كلمة المرور',
            myListings: 'إعلاناتي',
            reportNewLostItem: 'الإبلاغ عن غرض مفقود جديد',
            noPosts: 'لم تنشر أي أغراض بعد.',
            loadMore: 'تحميل المزيد',
            verifiedUser: 'مستخدم موثّق',
            unverifiedEmail: 'بريد غير موثّق',
            profileUpdated: 'تم تحديث الملف الشخصي بنجاح',
            profileUpdateFailed: 'تعذر تحديث الملف الشخصي',
            passwordsMismatch: 'كلمتا المرور غير متطابقتين',
            passwordTooShort: 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
            passwordHasSpaces: 'لا يمكن أن تحتوي كلمة المرور على مسافات',
            passwordUpdated: 'تم تحديث كلمة المرور بنجاح',
            passwordUpdateFailed: 'تعذر تحديث كلمة المرور',
            loggedOut: 'تم تسجيل الخروج بنجاح',
            logoutFailed: 'تعذر تسجيل الخروج',
            listingsLoadFailed: 'تعذر تحميل إعلاناتك',
            resolve: 'حلّ',
            delete: 'حذف',
            resolveConfirm: 'هل تريد تعليم هذا الغرض كمحلول؟ سيتم إزالته من العرض العام.',
            resolved: 'تم تعليم الغرض كمحلول',
            resolveFailed: 'تعذر حل الإعلان',
            deleteConfirm: 'هل أنت متأكد من حذف هذا الإعلان؟ لا يمكن التراجع عن هذا الإجراء.',
            deleted: 'تم حذف الإعلان',
            deleteFailed: 'تعذر حذف الإعلان',
            verificationSent: 'تم إرسال رسالة التحقق! تحقق من بريدك الوارد.',
            verificationFailed: 'تعذر إرسال رسالة التحقق',
        },
        lost: {
            documentTitle: 'المفقودات - Traceback',
            description: 'تصفح المفقودات التي أبلغ عنها المجتمع',
            pageTitle: 'المفقودات',
            reportTitle: 'الإبلاغ عن غرض مفقود',
            signInPrompt: 'سجّل الدخول لإرسال المفقودات.',
            searchTitle: 'البحث في المفقودات',
            itemName: 'اسم الغرض',
            itemNamePlaceholder: 'مثل: حقيبة ظهر سوداء من North Face',
            category: 'الفئة',
            selectCategory: 'اختر فئة',
            dateLost: 'تاريخ الفقدان',
            location: 'آخر موقع شوهد فيه',
            selectLocation: 'اختر موقعًا',
            describeLocation: 'صف الموقع',
            describeLocationPlaceholder: 'مثل: غرفة الأستاذ أندرسون، قرب نافورة الماء',
            tags: 'الوسوم',
            tagsPlaceholder: 'مثل: أحمر، Nike، سحاب...',
            addedTags: 'الوسوم المضافة',
            descriptionLabel: 'الوصف',
            descriptionPlaceholder: 'أي شيء آخر يساعد على التعرف عليه؟',
            imageUpload: 'رفع صورة',
            signInNow: 'سجّل الدخول الآن',
            searchItemNamePlaceholder: 'ابحث باسم الغرض...',
            searchTagsPlaceholder: 'ابحث بالوسوم...',
            locationLost: 'مكان الفقدان',
            searchLocationPlaceholder: 'مكان الفقدان...',
            dateFrom: 'من تاريخ',
            dateTo: 'إلى تاريخ',
            sort: 'الترتيب',
            oldestFirst: 'الأقدم أولًا',
            newestFirst: 'الأحدث أولًا',
        },
        found: {
            documentTitle: 'المعثورات - Traceback',
            description: 'تصفح المعثورات التي أبلغ عنها المجتمع',
            pageTitle: 'المعثورات',
            reportTitle: 'الإبلاغ عن غرض معثور عليه',
            signInPrompt: 'سجّل الدخول لإرسال المعثورات.',
            searchTitle: 'البحث في المعثورات',
            itemName: 'اسم الغرض',
            itemNamePlaceholder: 'مثل: حقيبة ظهر سوداء من North Face',
            category: 'الفئة',
            selectCategory: 'اختر فئة',
            dateFound: 'تاريخ العثور',
            location: 'مكان العثور',
            selectLocation: 'اختر موقعًا',
            describeLocation: 'صف الموقع',
            describeLocationPlaceholder: 'مثل: غرفة الأستاذ أندرسون، قرب نافورة الماء',
            tags: 'الوسوم',
            tagsPlaceholder: 'مثل: أحمر، Nike، سحاب...',
            addedTags: 'الوسوم المضافة',
            descriptionLabel: 'الوصف',
            descriptionPlaceholder: 'أي شيء آخر يساعد على التعرف عليه؟',
            imageUpload: 'رفع صورة',
            signInNow: 'سجّل الدخول الآن',
            searchItemNamePlaceholder: 'ابحث باسم الغرض...',
            searchTagsPlaceholder: 'ابحث بالوسوم...',
            locationFound: 'مكان العثور',
            searchLocationPlaceholder: 'مكان العثور...',
            dateFrom: 'من تاريخ',
            dateTo: 'إلى تاريخ',
            sort: 'الترتيب',
            oldestFirst: 'الأقدم أولًا',
            newestFirst: 'الأحدث أولًا',
        },
        forms: {
            categories: { electronics: 'إلكترونيات', clothing: 'ملابس', id: 'بطاقة/هوية', keys: 'مفاتيح', bags: 'حقائب/حقائب ظهر', bottle: 'زجاجة ماء', jewelry: 'مجوهرات', supplies: 'كتب/لوازم', other: 'أخرى' },
            locations: { library: 'المكتبة', gym: 'الصالة الرياضية', cafeteria: 'الكافيتريا', hallway: 'الممر الرئيسي', classroom: 'الفصل', parking: 'موقف السيارات', bathroom: 'الحمام', office: 'المكتب الأمامي', other: 'أخرى...' },
            removeTag: 'إزالة الوسم {tag}',
            previewUpload: 'معاينة الصورة المرفوعة',
            imageToCrop: 'الصورة المراد اقتصاصها',
            accountSaved: 'تم حفظ تفضيل المظهر',
            languageSaved: 'تم حفظ تفضيل اللغة على هذا الجهاز',
            showPassword: 'إظهار كلمة المرور',
            hidePassword: 'إخفاء كلمة المرور',
        }
    }
};

function getPathValue(object, path) {
    return path.split('.').reduce((value, segment) => value?.[segment], object);
}

export function getCurrentLanguage() {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return SUPPORTED_LANGUAGES.has(storedLanguage) ? storedLanguage : 'en';
}

export function t(key, variables = {}) {
    const language = getCurrentLanguage();
    const value = getPathValue(translations[language], key) ?? getPathValue(translations.en, key) ?? key;

    if (typeof value !== 'string') {
        return value;
    }

    return value.replace(/\{(\w+)\}/g, (_, name) => variables[name] ?? `{${name}}`);
}

export function getArray(key) {
    const value = getPathValue(translations[getCurrentLanguage()], key) ?? getPathValue(translations.en, key);
    return Array.isArray(value) ? value : [];
}

function setText(selector, key, variables) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = t(key, variables);
    }
}

function setHTML(selector, key, variables) {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = t(key, variables);
    }
}

function setAttr(selector, attribute, key, variables) {
    const element = document.querySelector(selector);
    if (element) {
        element.setAttribute(attribute, t(key, variables));
    }
}

function setAllText(selector, key) {
    document.querySelectorAll(selector).forEach((element) => {
        element.textContent = t(key);
    });
}

function setTrailingText(selector, key) {
    const element = document.querySelector(selector);
    if (!element) return;

    const translated = ` ${t(key)}`;
    const textNode = [...element.childNodes].reverse().find((node) => node.nodeType === Node.TEXT_NODE);
    if (textNode) {
        textNode.textContent = translated;
    } else {
        element.append(document.createTextNode(translated));
    }
}

function setAllAttr(selector, attribute, key) {
    document.querySelectorAll(selector).forEach((element) => {
        element.setAttribute(attribute, t(key));
    });
}

function translateCommon() {
    const html = document.documentElement;
    const language = getCurrentLanguage();
    html.lang = language;
    html.dir = language === 'ar' ? 'rtl' : 'ltr';

    setTrailingText('nav .nav-home a', 'nav.home');
    setTrailingText('nav .nav-lost a', 'nav.lost');
    setTrailingText('nav .nav-found a', 'nav.found');

    const loginLink = document.getElementById('login-link');
    if (loginLink) {
        const signinSpan = loginLink.querySelector('.nav-text-signin');
        const accountSpan = loginLink.querySelector('.nav-text-account');
        if (signinSpan) signinSpan.textContent = t('nav.signIn');
        if (accountSpan) accountSpan.textContent = t('nav.account');
    }

    setText('footer .footer-brand p', 'common.brandTagline');
    setText('#footer-bottom p', 'common.copyright');
    setAllAttr('.modal-close', 'aria-label', 'common.close');
    setAllText('#crop-cancel', 'common.cancel');
    setAllText('#crop-confirm', 'common.cropUse');
    setAllText('#modal-contact-btn', 'common.contactReporter');
    setAllText('#feed-load-more', 'common.loadMore');
    setAllText('#load-more-btn', 'common.loadMore');
    setAllText('.btn-reset', 'common.resetFilters');
    setAttr('#image-preview', 'alt', 'forms.previewUpload');
    setAttr('#crop-image', 'alt', 'forms.imageToCrop');
    setAttr('#image-remove', 'aria-label', 'forms.previewUpload');
    document.querySelectorAll('.toggle-password').forEach((button) => {
        if (!button.classList.contains('showing')) {
            button.setAttribute('aria-label', t('forms.showPassword'));
        }
    });

    // Settings gear popup translations
    setAllText('.settings-popup-label.gear-language-label', 'account.language');
    setAllText('.settings-popup-label.gear-theme-label', 'account.appearance');
    setAllText('.settings-popup-label.gear-dyslexic-label', 'account.dyslexicFont');
    const gearTheme = document.getElementById('gear-theme');
    if (gearTheme) {
        const opts = gearTheme.options;
        for (let i = 0; i < opts.length; i++) {
            if (opts[i].value === 'system') opts[i].textContent = t('account.systemDefault');
            if (opts[i].value === 'light') opts[i].textContent = t('account.light');
            if (opts[i].value === 'dark') opts[i].textContent = t('account.dark');
        }
    }

    const gearLanguage = document.getElementById('gear-language');
    if (gearLanguage) {
        const labels = {
            en: 'English',
            es: 'Español',
            fr: 'Français',
            it: 'Italiano',
            zh: '中文',
            ar: 'العربية'
        };
        const opts = gearLanguage.options;
        for (let i = 0; i < opts.length; i++) {
            opts[i].textContent = labels[opts[i].value] || opts[i].textContent;
        }
    }
}

function translateHome() {
    document.title = t('home.documentTitle');
    setAttr('meta[name="description"]', 'content', 'home.description');
    setAttr('meta[property="og:title"]', 'content', 'home.ogTitle');
    setAttr('meta[property="og:description"]', 'content', 'home.ogDescription');
    setText('#hero .hero-card h1', 'home.heroTitle');
    setText('#hero .hero-card a', 'home.getStarted');
    setText('#mobile-header h1', 'home.documentTitle');
    const introHeading = document.querySelector('.info-headline h1');
    if (introHeading) {
        const textNode = [...introHeading.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
        if (textNode) textNode.textContent = t('home.introLead');
    }
    const typewriter = document.getElementById('typewriter');
    if (typewriter && !typewriter.textContent.trim()) {
        const [firstWord] = getArray('home.typewriterWords');
        typewriter.textContent = firstWord || '';
    }
    setText('.info-tagline', 'home.introTagline');
    setText('.feature-pill:nth-of-type(1) span', 'home.feature1');
    setText('.feature-pill:nth-of-type(2) span', 'home.feature2');
    setText('.feature-pill:nth-of-type(3) span', 'home.feature3');
    setText('#how-it-works .section-header h2', 'home.howTitle');
    setText('#how-it-works .section-header p', 'home.howSubtitle');
    setText('.step-card:nth-of-type(1) h3', 'home.step1Title');
    setText('.step-card:nth-of-type(1) p', 'home.step1Body');
    setText('.step-card:nth-of-type(2) h3', 'home.step2Title');
    setText('.step-card:nth-of-type(2) p', 'home.step2Body');
    setText('.step-card:nth-of-type(3) h3', 'home.step3Title');
    setText('.step-card:nth-of-type(3) p', 'home.step3Body');
    setText('#impact-stats .stat-item:nth-of-type(1) p', 'home.stat1');
    setText('#impact-stats .stat-item:nth-of-type(2) p', 'home.stat2');
    setText('#impact-stats .stat-item:nth-of-type(3) p', 'home.stat3');
    setText('#call-to-action h2', 'home.ctaTitle');
    setText('#call-to-action p', 'home.ctaBody');
    setText('#call-to-action .cta-buttons a:nth-of-type(1)', 'home.ctaPrimary');
    setText('#call-to-action .cta-buttons a:nth-of-type(2)', 'home.ctaSecondary');
}

function translateLogin() {
    document.title = t('login.documentTitle');
    setAttr('meta[name="description"]', 'content', 'login.description');
    setText('.page-header h1', 'login.pageTitle');
    setText('.page-header p', 'login.pageSubtitle');
    setTrailingText('.google-btn', 'login.google');
    setText('.or-divider span', 'login.or');
    setText('#login-form label:nth-of-type(1) > span', 'login.emailAddress');
    setAttr('#login-email', 'placeholder', 'login.emailAddress');
    setText('#login-form label:nth-of-type(2) > span', 'login.password');
    setAttr('#login-password', 'placeholder', 'login.passwordPlaceholder');
    setText('#forgot-password-link', 'login.forgotPassword');
    setAttr('#login-form input[type="submit"]', 'value', 'login.signIn');
    setText('#verification-panel h3', 'login.checkInbox');
    setHTML('#verification-panel p:nth-of-type(1)', 'login.verificationSentTo');
    setText('#verification-panel p:nth-of-type(2)', 'login.verificationInstruction');
    setText('#resend-verification-login', 'login.resendVerificationEmail');
    setText('#signout-unverified', 'login.signOutUseDifferent');
    setText('.auth-link', 'login.noAccount');
    setText('#forgot-password-modal .modal-header h2', 'login.resetTitle');
    setText('#forgot-password-modal .modal-body p', 'login.resetBody');
    setText('#forgot-password-form label span', 'login.emailAddress');
    setAttr('#forgot-email', 'placeholder', 'login.emailAddress');
    setText('#forgot-password-form button', 'login.sendResetLink');
}

function translateSignup() {
    document.title = t('signup.documentTitle');
    setAttr('meta[name="description"]', 'content', 'signup.description');
    setText('.page-header h1', 'signup.pageTitle');
    setText('.page-header p', 'signup.pageSubtitle');
    setTrailingText('.google-btn', 'signup.google');
    setText('.or-divider span', 'signup.or');
    setText('#signup-form label:nth-of-type(1) > span', 'signup.emailAddress');
    setAttr('#signup-email', 'placeholder', 'signup.emailAddress');
    setText('#signup-form label:nth-of-type(2) > span', 'signup.username');
    setAttr('#signup-name', 'placeholder', 'signup.usernamePlaceholder');
    setAttr('#signup-name', 'title', 'signup.usernameTitle');
    setText('#signup-form label:nth-of-type(3) > span', 'signup.password');
    setAttr('#signup-password', 'placeholder', 'signup.passwordPlaceholder');
    setText('#signup-form label:nth-of-type(4) > span', 'signup.confirmPassword');
    setAttr('#signup-confirm-password', 'placeholder', 'signup.confirmPasswordPlaceholder');
    setAttr('#signup-form input[type="submit"]', 'value', 'signup.signUp');
    setText('.auth-link', 'signup.alreadyHaveAccount');
}

function translateReset() {
    document.title = t('reset.documentTitle');
    setAttr('meta[name="description"]', 'content', 'reset.description');
    setText('.page-header h1', 'reset.pageTitle');
    setText('.page-header p', 'reset.pageSubtitle');
    setText('#reset-password-form label:nth-of-type(1) > span', 'reset.newPassword');
    setAttr('#reset-password', 'placeholder', 'reset.newPasswordPlaceholder');
    setText('#reset-password-form label:nth-of-type(2) > span', 'reset.confirmPassword');
    setAttr('#reset-confirm-password', 'placeholder', 'reset.confirmPasswordPlaceholder');
    setAttr('#reset-password-form input[type="submit"]', 'value', 'reset.resetPassword');
}

function translateVerify() {
    document.title = t('verify.documentTitle');
    setAttr('meta[name="description"]', 'content', 'verify.description');
    setText('.page-header h1', 'verify.pageTitle');
    if (!document.getElementById('verification-status')?.dataset.dynamic) {
        setText('#verification-status', 'verify.verifying');
    }
}

function translateError() {
    document.title = t('error.documentTitle');
    setAttr('meta[name="description"]', 'content', 'error.description');
    setText('.auth-card h1', 'error.pageTitle');
    setText('#error-message', 'error.defaultMessage');
    setText('.auth-card a', 'error.returnToLogin');
}

function translateAccount() {
    document.title = t('account.documentTitle');
    setAttr('meta[name="description"]', 'content', 'account.description');
    const userName = document.getElementById('user-name');
    if (userName && (!userName.textContent.trim() || userName.textContent === t('account.loadingProfile') || userName.textContent === translations.en.account.loadingProfile)) {
        userName.textContent = t('account.loadingProfile');
    }
    const userEmail = document.getElementById('user-email');
    if (userEmail && (!userEmail.textContent.trim() || userEmail.textContent === t('account.pleaseWait') || userEmail.textContent === translations.en.account.pleaseWait)) {
        userEmail.textContent = t('account.pleaseWait');
    }
    const verifiedBadge = document.getElementById('user-verified');
    if (verifiedBadge) {
        if (verifiedBadge.classList.contains('verified')) {
            verifiedBadge.textContent = t('account.verifiedUser');
        } else if (verifiedBadge.classList.contains('unverified')) {
            verifiedBadge.textContent = t('account.unverifiedEmail');
        } else {
            verifiedBadge.textContent = t('account.checkingStatus');
        }
    }
    setText('#resend-verification', 'account.resendVerificationEmail');
    setText('#logout-btn', 'account.signOut');
    setText('.user-settings .section-header h2', 'account.settingsTitle');
    setText('.settings-card:nth-of-type(1) h3', 'account.preferences');
    setText('label[for="language-preference"]', 'account.language');
    setText('#language-preference option[value="en"]', 'English');
    setText('#language-preference option[value="fr"]', 'Français');
    setText('#language-preference option[value="it"]', 'Italiano');
    setText('#language-preference option[value="zh"]', '中文');
    setText('#language-preference option[value="es"]', 'Español');
    setText('#language-preference option[value="ar"]', 'العربية');
    setText('.settings-note:nth-of-type(1)', 'account.preferencesSaved');
    setText('label[for="theme-preference"]', 'account.appearance');
    setText('.settings-note:nth-of-type(2)', 'account.appearanceHelp');
    setText('#theme-preference option[value="system"]', 'account.systemDefault');
    setText('#theme-preference option[value="light"]', 'account.light');
    setText('#theme-preference option[value="dark"]', 'account.dark');
    setText('.settings-card:nth-of-type(2) h3', 'account.updateProfile');
    setText('label[for="new-name"]', 'account.displayName');
    setAttr('#new-name', 'placeholder', 'account.displayNamePlaceholder');
    setText('#update-profile-form button', 'account.save');
    setText('.settings-card:nth-of-type(3) h3', 'account.changePassword');
    setText('label[for="old-password"]', 'account.currentPassword');
    setAttr('#old-password', 'placeholder', 'account.currentPasswordPlaceholder');
    setText('label[for="new-password"]', 'account.newPassword');
    setAttr('#new-password', 'placeholder', 'account.newPasswordPlaceholder');
    setText('label[for="confirm-password"]', 'account.confirmPassword');
    setAttr('#confirm-password', 'placeholder', 'account.confirmPasswordPlaceholder');
    setText('#change-password-form button[type="submit"]', 'account.updatePassword');
    setText('.user-listings .section-header h2', 'account.myListings');
    setText('.user-listings .section-header a', 'account.reportNewLostItem');
    setText('#no-posts-msg', 'account.noPosts');
    setText('#load-more-btn', 'account.loadMore');
}

function translateItemForms(prefix) {
    const key = prefix === 'lost' ? 'lost' : 'found';
    document.title = t(`${key}.documentTitle`);
    setAttr('meta[name="description"]', 'content', `${key}.description`);
    setText('.page-header h1', `${key}.pageTitle`);
    setText('.upload-form h2', `${key}.reportTitle`);
    setText(`label[for="item-name"]`, `${key}.itemName`);
    setAttr('#item-name', 'placeholder', `${key}.itemNamePlaceholder`);
    setText(`label[for="category"]`, `${key}.category`);
    setText('#category option[value="none"]', `${key}.selectCategory`);
    setText(`label[for="location"]`, `${key}.location`);
    setText('#location option[value="none"]', `${key}.selectLocation`);
    setText(`label[for="location-other"]`, `${key}.describeLocation`);
    setAttr('#location-other', 'placeholder', `${key}.describeLocationPlaceholder`);
    setText(`label[for="tag-input"]`, `${key}.tags`);
    setAttr('#tag-input', 'placeholder', `${key}.tagsPlaceholder`);
    setAttr('#tag-pills', 'aria-label', `${key}.addedTags`);
    setText(`label[for="description"]`, `${key}.descriptionLabel`);
    setAttr('#description', 'placeholder', `${key}.descriptionPlaceholder`);
    setText(`label[for="image-upload"]`, `${key}.imageUpload`);
    setText('#photo-hint', 'common.photoHint');
    setText('#submit-btn', 'common.submit');
    setText(`#signed-out-${prefix}-item-div h3`, `${key}.signInPrompt`);
    setText(`#signed-out-${prefix}-item-div a`, `${key}.signInNow`);
    setText('.search-bar h2', `${key}.searchTitle`);
    setAttr('#search-input', 'placeholder', `${key}.searchItemNamePlaceholder`);
    setAttr('#search-tags-input', 'placeholder', `${key}.searchTagsPlaceholder`);
    setAttr('#search-location', 'placeholder', `${key}.searchLocationPlaceholder`);
    setText('.search-actions button[type="submit"]', 'common.search');
    setText('.search-actions .btn-reset', 'common.resetFilters');

    const fieldLabels = document.querySelectorAll('.search-form label, #search-form > label, .secondary-search-items label');
    if (fieldLabels.length >= 6) {
        fieldLabels[0].childNodes[0].textContent = t(`${key}.itemName`);
        fieldLabels[1].childNodes[0].textContent = t(`${key}.tags`);
        fieldLabels[2].childNodes[0].textContent = t(`${key}.${prefix === 'lost' ? 'locationLost' : 'locationFound'}`);
        fieldLabels[3].childNodes[0].textContent = t(`${key}.dateFrom`);
        fieldLabels[4].childNodes[0].textContent = t(`${key}.dateTo`);
        fieldLabels[5].childNodes[0].textContent = ` ${t(`${key}.sort`)} `;
    }

    if (prefix === 'lost') {
        setText('label[for="date-lost"]', 'lost.dateLost');
    } else {
        setText('label[for="date-found"]', 'found.dateFound');
    }

    setText('#sort option:nth-of-type(1)', `${key}.oldestFirst`);
    setText('#sort option:nth-of-type(2)', `${key}.newestFirst`);
    setText('#crop-modal .modal-header h2', 'common.cropImage');
    setText('#crop-cancel', 'common.cancel');
    setText('#crop-confirm', 'common.cropUse');
    setText('#modal-contact-btn', 'common.contactReporter');

    Object.entries({
        electronics: 'forms.categories.electronics',
        clothing: 'forms.categories.clothing',
        id: 'forms.categories.id',
        keys: 'forms.categories.keys',
        bags: 'forms.categories.bags',
        bottle: 'forms.categories.bottle',
        jewelry: 'forms.categories.jewelry',
        supplies: 'forms.categories.supplies',
        other: 'forms.categories.other',
    }).forEach(([value, translationKey]) => setText(`#category option[value="${value}"]`, translationKey));

    Object.entries({
        library: 'forms.locations.library',
        gym: 'forms.locations.gym',
        cafeteria: 'forms.locations.cafeteria',
        hallway: 'forms.locations.hallway',
        classroom: 'forms.locations.classroom',
        parking: 'forms.locations.parking',
        bathroom: 'forms.locations.bathroom',
        office: 'forms.locations.office',
        other: 'forms.locations.other',
    }).forEach(([value, translationKey]) => setText(`#location option[value="${value}"]`, translationKey));
}

export function applyTranslations() {
    translateCommon();

    const path = window.location.pathname;
    const normalized = path.endsWith('/') ? 'index' : path.split('/').pop().replace('.html', '') || 'index';

    if (normalized === 'index') translateHome();
    if (normalized === 'login') translateLogin();
    if (normalized === 'signup') translateSignup();
    if (normalized === 'reset-password') translateReset();
    if (normalized === 'verify') translateVerify();
    if (normalized === 'error') translateError();
    if (normalized === 'account') translateAccount();
    if (normalized === 'lost') translateItemForms('lost');
    if (normalized === 'found') translateItemForms('found');
}
