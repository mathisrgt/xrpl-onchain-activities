import { Request, Response, NextFunction } from 'express'
import { generate as generateMemoOnchainContent, watch as watchMemoOnchainContent, text as textMemoOnchainContent } from '../services/memo.service'
import { GeneratedMemoOnchainContent, WatchResultMemoOnchainContent } from '../types/content.type'

export async function create(req: Request, res: Response): Promise<void> {
    res.status(400).json({
        success: false,
        error: 'This endpoint is not available for interactive activities. To create a new interactive activity, please create a pull request at github.com/xrpl-commons/onchain-content'
    })
}

export async function text(req: Request, res: Response): Promise<void> {
    const memoText = textMemoOnchainContent();

    res.status(200).json({
        success: true,
        data: memoText
    })
}

export async function status(req: Request, res: Response): Promise<void> {
    // TODO
}

export async function generate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { username } = req.body

        if (!username || typeof username !== 'string') {
            res.status(400).json({
                success: false,
                error: 'Missing or invalid "username" in request body'
            })
        }

        const generatedMemoOnchainContent: GeneratedMemoOnchainContent = await generateMemoOnchainContent(username)

        res.status(201).json({
            success: true,
            data: generatedMemoOnchainContent
        })
    } catch (error) {
        console.error('[memo][controller][generate] Error:', error)
        next(error) // Pass to Express global error handler
    }
}

export async function watch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { username, studentClassicAddress, solutionClassicAddress } = req.body

        if (!username || !studentClassicAddress || !solutionClassicAddress) {
            res.status(400).json({
                success: false,
                error: 'Missing or invalid params in request body'
            })
        }

        const watchResult: WatchResultMemoOnchainContent = await watchMemoOnchainContent(username, studentClassicAddress, solutionClassicAddress);

        res.status(201).json({
            success: true,
            data: watchResult
        })
    } catch (error) {
        console.error('[memo][controller][watch] Error:', error)
        next(error) // Pass to Express global error handler
    }
}