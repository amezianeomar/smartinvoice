<?php

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $jsonError = static fn (string $message, int $status, array $errors = []) => response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $status);

        $exceptions->render(function (ValidationException $e, $request) use ($jsonError) {
            if (! $request->expectsJson()) {
                return null;
            }

            return $jsonError('Validation failed', 422, $e->errors());
        });

        $exceptions->render(function (AuthenticationException $e, $request) use ($jsonError) {
            if (! $request->expectsJson()) {
                return null;
            }

            return $jsonError('Unauthenticated', 401, []);
        });

        $exceptions->render(function (AuthorizationException $e, $request) use ($jsonError) {
            if (! $request->expectsJson()) {
                return null;
            }

            return $jsonError('Forbidden', 403, []);
        });

        $exceptions->render(function (NotFoundHttpException $e, $request) use ($jsonError) {
            if (! $request->expectsJson()) {
                return null;
            }

            return $jsonError('Resource not found', 404, []);
        });

        $exceptions->render(function (\Throwable $e, $request) use ($jsonError) {
            if (! $request->expectsJson()) {
                return null;
            }

            return $jsonError('Server error', 500, []);
        });
    })->create();
